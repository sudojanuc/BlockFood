// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

import "./IPublicLock.sol";
import "./ReservationProvider.sol";

contract Reservation
{
    IPublicLock internal publicLock;
    ReservationProvider internal reservationProvider;

    struct Reservation
    {
        uint id;
        uint checkInKey;
        string providerName;
        bool isCreated;
    }

    Reservation[] private reservations;

    event CreateReservation(address owner, Reservation reservation);
    event RefundReservation(address owner, Reservation reservation);

    mapping (uint => uint) private reservationsOfUnit;
    mapping (uint => address) private reservationsOfOwner;
    mapping (address => uint) private reservationCountOfOwner;
    mapping (uint => Reservation) private reservationIdOfReservation;
    mapping (uint => uint) private reservationCountOfUnit;
    mapping (uint => uint) private unitOfReservation;

    constructor() public{
        publicLock = IPublicLock(0x9D3BAd7746Df8941d88377f65edE7f5F42c88e1b);
        reservationProvider = ReservationProvider(0xFaDe2d70699edadBD9e673d25B47eE9A05F971B2);
    }

    function refundReservation(uint reservationId, uint checkInKey) external
    {
        require(reservationIdOfReservation[reservationId].checkInKey == checkInKey);
        uint tokenId = publicLock.getTokenIdFor(msg.sender);
        publicLock.setKeyManagerOf(tokenId, address(this));
        publicLock.cancelAndRefund(tokenId);

        emit RefundReservation(msg.sender, reservations[reservationId]);

        delete reservations[reservationId];
        reservationProvider.decreaseUnitReservationCount(unitOfReservation[reservationId]);
    }

    /*function withdrawReservationFee(uint reservationId) public
    {
        //publicLock.withdraw(msg.sed, publicLock.keyPrice());
    }*/

    function createReservation(uint reservationUnitId) external payable
    {
        require(msg.value >= publicLock.keyPrice());
        publicLock.purchase.value(msg.value)(publicLock.keyPrice(), msg.sender, address(0), '0x00');
        uint id = reservations.length;
        Reservation memory reservation = Reservation(
            id,
            generateRandomCheckInKey(block.number),
            reservationProvider.getProviderOfUnit(reservationUnitId).name,
            true);
        reservations.push(reservation);
        reservationsOfUnit[id] = reservationUnitId;
        reservationCountOfUnit[reservationUnitId]++;
        reservationProvider.increaseUnitReservationCount(reservationUnitId);

        reservationIdOfReservation[id] = reservations[id];
        reservationsOfOwner[id] = msg.sender;
        reservationCountOfOwner[msg.sender]++;

        unitOfReservation[id] = reservationUnitId;

        emit CreateReservation(msg.sender, reservations[id]);
    }

    function generateRandomCheckInKey(uint id) private pure returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(id)));
        return rand % 10**8;
    }

    function getReservationsOfUnit(uint reservationUnitId) external view returns(Reservation[] memory)
    {

        Reservation[] memory res = new Reservation[](reservationCountOfUnit[reservationUnitId]);
        uint count = 0;

        for(uint i = 0; i < reservations.length; i++)
        {
            if(reservationsOfUnit[i] == reservationUnitId)
            {
                res[count++] = reservations[i];
            }
        }
        return res;
    }

    function getReservations() external view returns (Reservation[] memory)
    {
        return reservations;
    }

    function getReservationsOfOwner() external view returns (Reservation[] memory)
    {
        Reservation[] memory res = new Reservation[](reservationCountOfOwner[msg.sender]);
        uint count = 0;
        for (uint i = 0; i < reservations.length; i++)
        {
            if(reservationsOfOwner[i] == msg.sender)
            {
                res[count++] = reservations[i];
            }
        }

        return res;
    }

    function getKeyPrice() external view returns (uint) { return publicLock.keyPrice(); }
}
