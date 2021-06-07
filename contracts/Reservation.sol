// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./interfaces/IReservation.sol";
import "./interfaces/unlock/IPublicLock.sol";
import "./interfaces/unlock/IUnlock.sol";

import "./Owned.sol";
import "./Unit.sol";

contract Reservation is IReservation, Owned {
    uint256 counter;

    struct ReservationInternalStruct {
        uint256 reservationListPointer;
        bytes32 unitKey;
        address owner;
        //custom data
        uint256 checkInKey;
    }

    Unit internal unit;
    IPublicLock internal lock;
    IUnlock internal unlock;

    mapping(bytes32 => ReservationInternalStruct) public reservationStructs;
    bytes32[] public reservationList;

    constructor(address adrUnit) public {
        unit = Unit(adrUnit);
        lock = IPublicLock(0x2D7Fa4dbdF5E7bfBC87523396aFfD6d38c9520fa);
    }

    function initializeUnlock() public {
        unlock.initialize(msg.sender);
    }

    function setUnitAddress(address adr) external onlyOwner {
        unit = Unit(adr);
    }

    function setLockAddress(address payable adr) external onlyOwner {
        lock = IPublicLock(adr);
    }

    function getReservationCount() public view returns (uint256) {
        return reservationList.length;
    }

    function isReservation(bytes32 reservationId) public view returns (bool) {
        if (reservationList.length == 0) return false;
        return
            reservationList[
                reservationStructs[reservationId].reservationListPointer
            ] == reservationId;
    }

    function getAllReservations()
        external
        view
        returns (ReservationStruct[] memory)
    {
        ReservationStruct[] memory array =
            new ReservationStruct[](getReservationCount());

        for (uint256 i = 0; i < array.length; i++) {
            array[i].reservationId = reservationList[i];
            array[i].unitKey = reservationStructs[array[i].reservationId]
                .unitKey;
            array[i].owner = reservationStructs[array[i].reservationId].owner;
        }
        return array;
    }

    function createReservation(address sender, bytes32 unitId)
        public
        payable
        returns (ReservationStruct memory)
    {
        return createReservation(sender, bytes32(counter++), unitId);
    }

    function createReservation(
        address sender,
        bytes32 reservationId,
        bytes32 unitId
    ) public returns (ReservationStruct memory) {
        require(unit.isUnit(unitId), "UNIT_DOES_NOT_EXIST");
        require(!isReservation(reservationId), "DUPLICATE_RESERVATION_KEY"); // duplicate key prohibited
        require(purchaseReservation(sender), "PURCHASE_FAILED");

        reservationList.push(reservationId);
        reservationStructs[reservationId].reservationListPointer =
            reservationList.length -
            1;
        reservationStructs[reservationId].unitKey = unitId;
        reservationStructs[reservationId].owner = sender;
        reservationStructs[reservationId].checkInKey = generateRandomCheckInKey(
            block.number + uint256(unitId)
        );

        unit.addReservation(unitId, reservationId);

        return
            ReservationStruct(
                reservationId,
                reservationStructs[reservationId].unitKey,
                reservationStructs[reservationId].owner
            );
    }

    function deleteReservation(bytes32 reservationId)
        public
        returns (bytes32)
    {
        require(isReservation(reservationId), "RESERVATION_DOES_NOT_EXIST");

        // delete from table
        uint256 rowToDelete =
            reservationStructs[reservationId].reservationListPointer;
        bytes32 keyToMove = reservationList[reservationList.length - 1];
        reservationList[rowToDelete] = keyToMove;
        reservationStructs[reservationId].reservationListPointer = rowToDelete;
        reservationList.pop();

        bytes32 unitId = reservationStructs[reservationId].unitKey;
        unit.removeReservation(unitId, reservationId);

        return reservationId;
    }

    function purchaseReservation(address sender)
        internal
        returns (bool)
    {
        require(msg.value >= lock.keyPrice(), "VALUE_TOO_SMALL");
        lock.purchase.value(msg.value)(
            lock.keyPrice(),
            sender,
            address(0),
            "0x00"
        );
        uint256 tokenId = lock.getTokenIdFor(sender);
        lock.setKeyManagerOf(tokenId, address(this));
        require(
            lock.keyManagerOf(tokenId) == address(this),
            "LOCK_MANAGER_NOT_SET_TO_RESERVATION_CONTRACT"
        );

        return true;
    }

    function refundReservation(
        address sender,
        bytes32 reservationId,
        uint256 checkInKey
    ) external returns (ReservationStruct memory) {
        require(
            reservationStructs[reservationId].checkInKey == checkInKey,
            "CHECK_IN_KEY_WRONG"
        );
        uint256 tokenId = lock.getTokenIdFor(sender);
        lock.cancelAndRefund(tokenId);

        return
            ReservationStruct(
                reservationId,
                reservationStructs[reservationId].unitKey,
                reservationStructs[reservationId].owner
            );
    }

    function generateRandomCheckInKey(uint256 id)
        private
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encodePacked(id))) % 10**8;
    }
}
