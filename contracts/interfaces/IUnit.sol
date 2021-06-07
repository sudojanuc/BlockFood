// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "./IOwner.sol";

interface IUnit {
    struct UnitStruct {
        bytes32 unitId;
        bytes32 providerKey;
        bytes32[] reservationKeys;
        uint16 guestCount;
    }

    function setProviderAddress(address adr) external;

    function getUnitCount() external view returns (uint256);

    function isUnit(bytes32 unitId) external view returns (bool);

    function getAllUnits() external view returns (UnitStruct[] memory);

    function createUnit(address sender, bytes32 providerId, uint16 guestCount)
        external
        returns (UnitStruct memory);

    function deleteUnit(address sender, bytes32 unitId) external returns (bytes32);
}
