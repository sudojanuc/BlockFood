// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

interface IReservation {
    struct ReservationStruct {
        bytes32 reservationId;
        bytes32 unitKey;
        address owner;
    }

    function setUnitAddress(address adr) external;

    function getReservationCount() external view returns (uint256);

    function isReservation(bytes32 reservationId) external view returns (bool);

    function getAllReservations()
        external
        view
        returns (ReservationStruct[] memory);

    function createReservation(address sender, bytes32 unitId)
        external
        payable
        returns (ReservationStruct memory);

    function deleteReservation(bytes32 reservationId) external returns (bytes32);

    function refundReservation(
        address sender,
        bytes32 reservationId,
        uint256 checkInKey
    ) external returns (ReservationStruct memory);
}
