// SPDX-License-Identifier: MIT

pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./interfaces/IUnit.sol";
import "./interfaces/unlock/IPublicLock.sol";

import "./Owned.sol";
import "./Provider.sol";


contract Unit is IUnit, Owned {
    uint256 counter;

    struct UnitInternalStruct {
        uint256 unitListPointer;
        bytes32 providerKey;
        bytes32[] reservationKeys;
        mapping(bytes32 => uint256) reservationKeyPointers;
        //custom data
        uint16 guestCount;
    }

    Provider internal provider;

    mapping(bytes32 => UnitInternalStruct) public unitStructs;
    bytes32[] public unitList;

    constructor(address adr) public {
        provider = Provider(adr);
    }

    function getLock(bytes32 key) public view returns (IPublicLock) {
        return provider.getLock(unitStructs[key].providerKey);
    }

    function setProviderAddress(address adr) external onlyOwner {
        provider = Provider(adr);
    }

    function isUnit(bytes32 unitKey) public view returns (bool) {
        if (unitList.length == 0) return false;
        return unitList[unitStructs[unitKey].unitListPointer] == unitKey;
    }

    function isUnitOwner(address sender, bytes32 unitKey)
        public
        view
        returns (bool)
    {
        require(
            provider.isProviderOwner(sender, unitStructs[unitKey].providerKey), "SENDER_IS_NOT_OWNER"
        );

        return true;
    }

    function getAllUnits() external view returns (UnitStruct[] memory) {
        UnitStruct[] memory array = new UnitStruct[](unitList.length);

        for (uint256 i = 0; i < array.length; i++) {
            array[i].unitKey = unitList[i];
            array[i].guestCount = unitStructs[array[i].unitKey].guestCount;
            array[i].providerKey = unitStructs[array[i].unitKey].providerKey;
            array[i].reservationKeys = unitStructs[array[i].unitKey]
                .reservationKeys;
        }
        return array;
    }

    function createUnit(
        address sender,
        bytes32 providerKey,
        uint16 guestCount
    ) external returns (UnitStruct memory) {
        return createUnit(sender, bytes32(counter++), providerKey, guestCount);
    }

    function createUnit(
        address sender,
        bytes32 unitKey,
        bytes32 providerKey,
        uint16 guestCount
    ) public returns (UnitStruct memory) {
        require(provider.isProvider(providerKey), "PROVIDER_DOES_NOT_EXIST");
        require(!isUnit(unitKey), "DUPLICATE_UNIT_KEY"); // duplicate key prohibited
        require(guestCount > 0, "GUEST_COUNT_IMPLAUSIBLE");
        require(
            provider.isProviderOwner(sender, providerKey),
            "NOT_OWNER_CREATE_UNIT"
        );

        unitList.push(unitKey);
        unitStructs[unitKey].unitListPointer = unitList.length - 1;
        unitStructs[unitKey].providerKey = providerKey;
        unitStructs[unitKey].guestCount = guestCount;

        provider.addUnit(sender, providerKey, unitKey);

        return
            UnitStruct(
                unitKey,
                unitStructs[unitKey].providerKey,
                unitStructs[unitKey].reservationKeys,
                unitStructs[unitKey].guestCount
            );
    }

    function deleteUnit(address sender, bytes32 unitKey)
        external
        returns (bytes32)
    {
        require(isUnit(unitKey), "UNIT_DOES_NOT_EXIST");
        require(
            provider.isProviderOwner(sender, unitStructs[unitKey].providerKey),
            "NOT_OWNER_DELETE_UNIT"
        );

        // delete from table
        uint256 rowToDelete = unitStructs[unitKey].unitListPointer;
        bytes32 keyToMove = unitList[unitList.length - 1];
        unitList[rowToDelete] = keyToMove;
        unitStructs[unitKey].unitListPointer = rowToDelete;
        unitList.pop();

        bytes32 providerKey = unitStructs[unitKey].providerKey;
        provider.removeUnit(sender, providerKey, unitKey);
        return unitKey;
    }

    function addReservation(bytes32 unitKey, bytes32 reservationKey) public {
        unitStructs[unitKey].reservationKeys.push(reservationKey);
        unitStructs[unitKey].reservationKeyPointers[reservationKey] =
            unitStructs[unitKey].reservationKeys.length -
            1;
    }

    function removeReservation(bytes32 unitKey, bytes32 reservationKey) public {
        uint256 rowToDelete =
            unitStructs[unitKey].reservationKeyPointers[reservationKey];
        bytes32 keyToMove =
            unitStructs[unitKey].reservationKeys[
                unitStructs[unitKey].reservationKeys.length - 1
            ];
        unitStructs[unitKey].reservationKeys[rowToDelete] = keyToMove;
        unitStructs[unitKey].reservationKeyPointers[keyToMove] = rowToDelete;
        unitStructs[unitKey].reservationKeys.pop();
    }
}
