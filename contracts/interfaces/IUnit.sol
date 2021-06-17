// SPDX-License-Identifier: MIT

pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

interface IUnit {
    struct UnitStruct {
        bytes32 unitKey;
        bytes32 providerKey;
        bytes32[] reservationKeys;
        uint16 guestCount;
    }

    function setChild(address childAdr) external;
    function setRemote(address adr) external;

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
