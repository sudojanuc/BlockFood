// SPDX-License-Identifier: MIT

pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./interfaces/IReservation.sol";

import "./Unit.sol";
import "./AccessRestriction.sol";

contract Reservation is IReservation, AccessRestriction {
    uint256 counter;

    struct ReservationInternalStruct {
        uint256 reservationListPointer;
        bytes32 unitKey;
        address owner;
        //custom data
        uint256 checkInKey;
        uint256 startTime;
        uint256 endTime;
    }

    Unit internal unit;

    mapping(bytes32 => IPublicLock) public locks;
    mapping(bytes32 => ReservationInternalStruct) internal reservationStructs;
    bytes32[] public reservationList;

    constructor(address adrUnit) public {
        unit = Unit(adrUnit);
    }

    function setUnitAddress(address adr) external onlyRemote {
        unit = Unit(adr);
    }

    function isReservation(bytes32 reservationKey) public view returns (bool) {
        if (reservationList.length == 0) return false;
        return
            reservationList[
                reservationStructs[reservationKey].reservationListPointer
            ] == reservationKey;
    }

    function isTimeAvailable(uint256 time) public view returns (bool) {
        uint256 i;
        for (i = 0; i < reservationList.length; i++) {
            if (
                reservationStructs[reservationList[i]].startTime <= time &&
                reservationStructs[reservationList[i]].endTime > time
            ) return false;
        }

        return true;
    }

    function getAllReservations()
        external
        view
        returns (ReservationStruct[] memory)
    {
        uint256 i;
        ReservationStruct[] memory array =
            new ReservationStruct[](reservationList.length);

        for (i = 0; i < array.length; i++) {
            array[i].reservationKey = reservationList[i];
            array[i].unitKey = reservationStructs[array[i].reservationKey]
                .unitKey;
            array[i].owner = reservationStructs[array[i].reservationKey].owner;
            array[i].startTime = reservationStructs[array[i].reservationKey]
                .startTime;
            array[i].endTime = reservationStructs[array[i].reservationKey]
                .endTime;
        }
        return array;
    }

    function createReservation(
        address sender,
        bytes32 unitKey,
        uint256 startTime
    ) public payable onlyRemote returns (ReservationStruct memory) {
        return
            createReservation(sender, bytes32(counter++), unitKey, startTime);
    }

    function createReservation(
        address sender,
        bytes32 reservationKey,
        bytes32 unitKey,
        uint256 startTime
    ) public onlyRemote returns (ReservationStruct memory) {
        require(unit.isUnit(unitKey), "UNIT_DOES_NOT_EXIST");
        require(!isReservation(reservationKey), "DUPLICATE_RESERVATION_KEY"); // duplicate key prohibited
        require(isTimeAvailable(startTime), "TIME_NOT_AVAILABLE");

        locks[reservationKey] = unit.getLock(unitKey); //needed to get one key per reservation

        require(
            address(locks[reservationKey]) != address(0),
            "NO_LOCK_IN_RESERVATION"
        );
        require(purchaseReservation(sender, reservationKey), "PURCHASE_FAILED");

        reservationList.push(reservationKey);
        reservationStructs[reservationKey].reservationListPointer =
            reservationList.length -
            1;
        reservationStructs[reservationKey].unitKey = unitKey;
        reservationStructs[reservationKey].owner = sender;
        reservationStructs[reservationKey].startTime = startTime;
        reservationStructs[reservationKey].endTime =
            startTime +
            (unit.getTimePerReservation(unitKey) * 3600);
        reservationStructs[reservationKey]
            .checkInKey = generateRandomCheckInKey(
            block.number + uint256(unitKey)
        );

        unit.addReservation(unitKey, reservationKey);

        return
            ReservationStruct(
                reservationKey,
                reservationStructs[reservationKey].unitKey,
                reservationStructs[reservationKey].owner,
                reservationStructs[reservationKey].startTime,
                reservationStructs[reservationKey].endTime
            );
    }

    function deleteReservation(bytes32 reservationKey)
        public
        returns (bytes32)
    {
        require(isReservation(reservationKey), "RESERVATION_DOES_NOT_EXIST");

        // delete from table
        uint256 rowToDelete =
            reservationStructs[reservationKey].reservationListPointer;
        bytes32 keyToMove = reservationList[reservationList.length - 1];
        reservationList[rowToDelete] = keyToMove;
        reservationStructs[reservationKey].reservationListPointer = rowToDelete;
        reservationList.pop();

        bytes32 unitKey = reservationStructs[reservationKey].unitKey;
        unit.removeReservation(unitKey, reservationKey);

        return reservationKey;
    }

    function purchaseReservation(address sender, bytes32 reservationKey)
        internal
        returns (bool)
    {
        require(
            msg.value >= locks[reservationKey].keyPrice(),
            "VALUE_TOO_SMALL"
        );
        locks[reservationKey].purchase.value(msg.value)(
            locks[reservationKey].keyPrice(),
            sender,
            0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B,
            "0x00"
        );
        uint256 tokenId = locks[reservationKey].getTokenIdFor(sender);
        locks[reservationKey].setKeyManagerOf(tokenId, address(this));
        require(
            locks[reservationKey].keyManagerOf(tokenId) == address(this),
            "LOCK_MANAGER_NOT_SET_TO_RESERVATION_CONTRACT"
        );

        return true;
    }

    function refundReservation(
        address sender,
        bytes32 reservationKey,
        uint256 checkInKey
    ) external onlyRemote returns (ReservationStruct memory) {
        require(
            reservationStructs[reservationKey].checkInKey == checkInKey,
            "CHECK_IN_KEY_WRONG"
        );
        uint256 tokenId = locks[reservationKey].getTokenIdFor(sender);
        locks[reservationKey].cancelAndRefund(tokenId);

        return
            ReservationStruct(
                reservationKey,
                reservationStructs[reservationKey].unitKey,
                reservationStructs[reservationKey].owner,
                reservationStructs[reservationKey].startTime,
                reservationStructs[reservationKey].endTime
            );
    }

    function generateRandomCheckInKey(uint256 id)
        private
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encodePacked(id))) % 10**8;
    }

    function getCheckInKey(address sender, bytes32 reservationKey)
        external
        view
        onlyRemote
        returns (uint256)
    {
        require(
            unit.isUnitOwner(
                sender,
                reservationStructs[reservationKey].unitKey
            ),
            "NOT_OWNER_GET_CHECK_IN_KEY"
        );
        return reservationStructs[reservationKey].checkInKey;
    }
}
