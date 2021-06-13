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
    event LogProviderDeleted(address sender, bytes32 providerKey);

    IUnit internal unit;
    event LogNewUnit(address sender, IUnit.UnitStruct unit);
    event LogUnitDeleted(address sender, bytes32 unitKey);

    IReservation internal reservation;
    event LogNewReservation(
        address sender,
        IReservation.ReservationStruct reservation
    );
    event LogReservationDeleted(address sender, bytes32 reservationKey);
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

    function isProviderOwner(bytes32 providerKey) public view returns (bool) {
        return provider.isProviderOwner(msg.sender, providerKey);
    }

    function getAllProviders()
        external
        view
        returns (IProvider.ProviderStruct[] memory)
    {
        return provider.getAllProviders();
    }

    function renameProvider(bytes32 providerKey, string calldata newName)
        external
    {
        provider.renameProvider(msg.sender, providerKey, newName);
    }

    function createProvider(string calldata name) external {
        emit LogNewProvider(
            msg.sender,
            provider.createProvider(msg.sender, name)
        );
    }

    function deleteProvider(bytes32 providerKey) external {
        provider.deleteProvider(msg.sender, providerKey);
        emit LogProviderDeleted(msg.sender, providerKey);
    }

    function setBuissnesHours(
        bytes32 key,
        uint8 weekDayType,
        uint8 startHour,
        uint8 endHour
    ) external {
        provider.setBuissnesHours(
            msg.sender,
            key,
            weekDayType,
            startHour,
            endHour
        );
    }

    function getBuissnesHours(bytes32 key, uint8 weekDayType)
        external
        view
        returns (uint8 start, uint8 end)
    {
        return provider.getBuissnesHours(key, weekDayType);
    }

    //unit methodes
    function setUnitAddress(address adr) external onlyOwner {
        require(address(reservation) != address(0), "SET_RESERVATION_FIRST");
        unit = IUnit(adr);
        reservation.setUnitAddress(adr);
    }

    function isUnitOwner(bytes32 unitKey) public view returns (bool) {
        return unit.isUnitOwner(msg.sender, unitKey);
    }

    function getAllUnits() external view returns (IUnit.UnitStruct[] memory) {
        return unit.getAllUnits();
    }

    function createUnit(bytes32 providerKey, uint16 guestCount) external {
        emit LogNewUnit(
            msg.sender,
            unit.createUnit(msg.sender, providerKey, guestCount)
        );
    }

    function deleteUnit(bytes32 unitKey) external {
        emit LogUnitDeleted(msg.sender, unit.deleteUnit(msg.sender, unitKey));
    }

    //reservation methodes
    function setReservationAddress(address adr) external onlyOwner {
        reservation = IReservation(adr);
    }

    function getAllReservations()
        external
        view
        returns (IReservation.ReservationStruct[] memory)
    {
        return reservation.getAllReservations();
    }

    function createReservation(bytes32 unitKey) external payable {
        emit LogNewReservation(
            msg.sender,
            reservation.createReservation.value(msg.value)(msg.sender, unitKey)
        );
    }

    function deleteReservation(bytes32 reservationKey) external {
        emit LogReservationDeleted(
            msg.sender,
            reservation.deleteReservation(reservationKey)
        );
    }

    function refundReservation(bytes32 reservationKey, uint256 checkInKey)
        external
    {
        emit LogRefundReservation(
            msg.sender,
            reservation.refundReservation(
                msg.sender,
                reservationKey,
                checkInKey
            )
        );
    }

    function getCheckInKey(bytes32 reservationKey)
        external
        view
        returns (uint256)
    {
        return reservation.getCheckInKey(msg.sender, reservationKey);
    }

    //lockFactory
    function initializeUnlock() external {
        provider.initializeUnlock();
    }

    function getKeyPrice(bytes32 providerKey) external view returns (uint256) {
        return provider.getKeyPrice(providerKey);
    }

    function updateKeyPrice(bytes32 providerKey, uint256 keyPrice) external {
        provider.updateKeyPrice(providerKey, keyPrice);
    }

    function getLock(bytes32 providerKey) external view returns (IPublicLock) {
        return provider.getLock(providerKey);
    }
}
