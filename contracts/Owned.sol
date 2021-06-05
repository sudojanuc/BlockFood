// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

contract Owned {
    address public owner;

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }
}
