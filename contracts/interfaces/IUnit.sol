// SPDX-License-Keyentifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "./IOwner.sol";

interface IUnit {
    struct UnitStruct {
        bytes32 unitKey;
        bytes32 providerKey;
        bytes32[] reservationKeys;
        uint16 guestCount;
    }

    function setProviderAddress(address adr) external;

    function isUnitOwner(address sender, bytes32 unitKey)
        external
        view
        returns (bool);

    function getAllUnits() external view returns (UnitStruct[] memory);

    function createUnit(
        address sender,
        bytes32 providerKey,
        uint16 guestCount
    ) external returns (UnitStruct memory);

    function deleteUnit(address sender, bytes32 unitKey)
        external
        returns (bytes32);
}
