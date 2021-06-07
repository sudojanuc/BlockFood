// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Owned.sol";
import "./interfaces/IProvider.sol";
import "./interfaces/IUnit.sol";
import "./interfaces/IReservation.sol";
import "./interfaces/IReservationHandler.sol";

contract ReservationHandler is Owned, IReservationHandler {
    IProvider internal provider;
    event LogNewProvider(address sender, IProvider.ProviderStruct provider);
    event LogProviderDeleted(address sender, bytes32 providerId);

    IUnit internal unit;
    event LogNewUnit(address sender, IUnit.UnitStruct unit);
    event LogUnitDeleted(address sender, bytes32 unitId);

    IReservation internal reservation;
    event LogNewReservation(
        address sender,
        IReservation.ReservationStruct reservation
    );
    event LogReservationDeleted(address sender, bytes32 reservationId);
    event LogRefundReservation(
        address sender,
        IReservation.ReservationStruct reservation
    );

    constructor(
        address adrProvider,
        address adrUnit,
        address adrReservation
    ) public {
        provider = IProvider(adrProvider);
        unit = IUnit(adrUnit);
        reservation = IReservation(adrReservation);
    }

    //provider methodes
    function setProviderAddress(address adr) external onlyOwner {
        require(address(unit) != address(0), "SET_UNIT_FIRST");
        provider = IProvider(adr);
        unit.setProviderAddress(adr);
    }

    function getProviderCount() external view returns (uint256) {
        return provider.getProviderCount();
    }

    function isProviderOwner(bytes32 providerId) public view returns (bool) {
        return provider.isProviderOwner(msg.sender, providerId);
    }

    function getProviderUnitCount(bytes32 providerId)
        external
        view
        returns (uint256)
    {
        return provider.getProviderUnitCount(providerId);
    }

    function getProviderUnitAtIndex(bytes32 providerId, uint256 row)
        external
        view
        returns (bytes32)
    {
        return provider.getProviderUnitAtIndex(providerId, row);
    }

    function getAllProviders()
        external
        view
        returns (IProvider.ProviderStruct[] memory)
    {
        return provider.getAllProviders();
    }

    function createProvider(string calldata name) external {
        emit LogNewProvider(
            msg.sender,
            provider.createProvider(msg.sender, name)
        );
    }

    function deleteProvider(bytes32 providerId) external {
        provider.deleteProvider(msg.sender, providerId);
        emit LogProviderDeleted(msg.sender, providerId);
    }

    //unit methodes
    function setUnitAddress(address adr) external onlyOwner {
        require(address(reservation) != address(0), "SET_RESERVATION_FIRST");
        unit = IUnit(adr);
        reservation.setUnitAddress(adr);
    }

    function getUnitCount() external view returns (uint256) {
        return unit.getUnitCount();
    }

    function getAllUnits() external view returns (IUnit.UnitStruct[] memory) {
        return unit.getAllUnits();
    }

    function createUnit(bytes32 providerId, uint16 guestCount) external {
        emit LogNewUnit(
            msg.sender,
            unit.createUnit(msg.sender, providerId, guestCount)
        );
    }

    function deleteUnit(bytes32 unitId) external {
        emit LogUnitDeleted(msg.sender, unit.deleteUnit(msg.sender, unitId));
    }

    //reservation methodes
    function setReservationAddress(address adr) external onlyOwner {
        reservation = IReservation(adr);
    }

    function getReservationCount() external view returns (uint256) {
        return reservation.getReservationCount();
    }

    function getAllReservations()
        external
        view
        returns (IReservation.ReservationStruct[] memory)
    {
        return reservation.getAllReservations();
    }

    function createReservation(bytes32 unitId) external payable {
        emit LogNewReservation(
            msg.sender,
            reservation.createReservation.value(msg.value)(msg.sender, unitId)
        );
    }

    function deleteReservation(bytes32 reservationId) external {
        emit LogReservationDeleted(
            msg.sender,
            reservation.deleteReservation(reservationId)
        );
    }

    function refundReservation(bytes32 reservationId, uint256 checkInKey)
        external
    {
        emit LogRefundReservation(
            msg.sender,
            reservation.refundReservation(msg.sender, reservationId, checkInKey)
        );
    }
}
