// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "./IProvider.sol";
import "./IUnit.sol";
import "./IReservation.sol";

interface IReservationHandler {
    ///provider
    function getProviderCount() external view returns (uint256);

    function isProviderOwner(bytes32 providerId) external view returns (bool);

    function getProviderUnitCount(bytes32 providerId)
        external
        view
        returns (uint256);

    function getProviderUnitAtIndex(bytes32 providerId, uint256 row)
        external
        view
        returns (bytes32);

    function getAllProviders()
        external
        view
        returns (IProvider.ProviderStruct[] memory);

    function createProvider(string calldata name) external;

    function deleteProvider(bytes32 providerId) external;

    ///reservation
    function setUnitAddress(address adr) external;

    function getReservationCount() external view returns (uint256);

    function getAllReservations()
        external
        view
        returns (IReservation.ReservationStruct[] memory);

    function createReservation(bytes32 unitId) external payable;

    function deleteReservation(bytes32 reservationId) external;

    function refundReservation(bytes32 reservationId, uint256 checkInKey)
        external;

    ///unit
    function setProviderAddress(address adr) external;

    function getUnitCount() external view returns (uint256);

    function getAllUnits() external view returns (IUnit.UnitStruct[] memory);

    function createUnit(bytes32 providerId, uint16 guestCount)
        external;

    function deleteUnit(bytes32 unitId) external;
}
