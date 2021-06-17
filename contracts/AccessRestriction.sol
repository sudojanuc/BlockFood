// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

contract AccessRestriction {
    address public owner;
    address public remote;
    bool internal first = true; //to make it possible to initialize

    modifier onlyOwner(){
        require(owner == msg.sender, "NOT_OWNER_CALL");
        _;
    }

    modifier onlyRemote() {
        require(remote == msg.sender, "NOT_REMOTE_CALL");
        _;
    }

    modifier onlyBy(address account) {
        require(msg.sender == account, "NOT_CALLED_BY_RIGHT_ADDRESS");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function setRemote(address adr) public {
        require(owner == msg.sender || first, "NOT_OWNER"); //has alwayse to be called one time in other contract
        remote = adr;
        first = false;
    }
}
