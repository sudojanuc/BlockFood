// SPDX-License-Keyentifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "./IProvider.sol";
import "./IUnit.sol";
import "./IReservation.sol";

interface IReservationHandler {
    ///provider
    function isProviderOwner(bytes32 providerKey) external view returns (bool);

    function getAllProviders()
        external
        view
        returns (IProvider.ProviderStruct[] memory);

    function renameProvider(bytes32 providerKey, string calldata newName)
        external;

    function createProvider(string calldata name, uint8 timePerReservation) external;

    function deleteProvider(bytes32 providerKey) external;

    function setBuissnesHours(
        bytes32 key,
        uint8 weekDayType,
        uint8 startHour,
        uint8 endHour
    ) external;

    function getBuissnesHours(bytes32 key, uint8 weekDayType)
        external
        view
        returns (uint8 start, uint8 end);

    ///reservation
    function setUnitAddress(address adr) external;

    function getAllReservations()
        external
        view
        returns (IReservation.ReservationStruct[] memory);

    function createReservation(bytes32 unitKey, uint256 startTime) external payable;

    function deleteReservation(bytes32 reservationKey) external;

    function refundReservation(bytes32 reservationKey, uint256 checkInKey)
        external;

    function getCheckInKey(bytes32 reservationKey)
        external
        view
        returns (uint256);

    ///unit
    function setProviderAddress(address adr) external;

    function isUnitOwner(bytes32 unitKey) external view returns (bool);

    function getAllUnits() external view returns (IUnit.UnitStruct[] memory);

    function createUnit(bytes32 providerKey, uint16 guestCount) external;

    function deleteUnit(bytes32 unitKey) external;

    //lockfactory
    function getKeyPrice(bytes32 providerKey) external view returns (uint256);

    function updateKeyPrice(bytes32 providerKey, uint256 keyPrice) external;

    function getLock(bytes32 providerKey) external view returns (IPublicLock);
}
