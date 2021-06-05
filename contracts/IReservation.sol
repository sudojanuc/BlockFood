// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

interface IReservation {
    struct ReservationStruct {
        bytes32 reservationId;
        bytes32 unitKey;
    }

    function getReservationCount() external view returns (uint256);

    function isReservation(bytes32 reservationId) external view returns (bool);

    function getAllReservations()
        external
        view
        returns (ReservationStruct[] memory);

    function createReservation(bytes32 unitId) external returns (bool);

    function deleteReservation(bytes32 reservationId) external returns (bool);

    function refundReservation(bytes32 reservationId, uint256 checkInKey)
        external
        returns (bool);
}
