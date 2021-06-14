// SPDX-License-Keyentifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

interface IReservation {
    struct ReservationStruct {
        bytes32 reservationKey;
        bytes32 unitKey;
        address owner;
    }

    function setUnitAddress(address adr) external;

    function getAllReservations()
        external
        view
        returns (ReservationStruct[] memory);

    function createReservation(address sender, bytes32 unitKey)
        external
        payable
        returns (ReservationStruct memory);

    function deleteReservation(bytes32 reservationKey)
        external
        returns (bytes32);

    function refundReservation(
        address sender,
        bytes32 reservationKey,
        uint256 checkInKey
    ) external returns (ReservationStruct memory);

    function getCheckInKey(address sender, bytes32 reservationKey)
        external
        view
        returns (uint256);
}
