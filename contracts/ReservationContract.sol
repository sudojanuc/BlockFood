// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

import "./IPublicLock.sol";
import "./ReservationManager.sol";

contract ReservationContract
{
    IPublicLock internal publicLock;
    ReservationManager internal reservationManager;

    constructor() public{
        publicLock = IPublicLock(0x9D3BAd7746Df8941d88377f65edE7f5F42c88e1b);
        reservationManager = ReservationManager(0x9FFA978Bd0f6e35653a7fd756CfbcfACa9952Ab7);
    }

    function createReservation() external payable
    {
        require(msg.value >= publicLock.keyPrice());
        publicLock.purchase(publicLock.keyPrice(), msg.sender, msg.sender, "0x00").value(msg.value)(msg.sender);
    }
}
