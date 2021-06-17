// SPDX-License-Identifier: MIT

pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./interfaces/unlock/IPublicLock.sol";
import "./interfaces/unlock/IUnlock.sol";

import "./AccessRestriction.sol";

contract LockFactory is AccessRestriction {
    IUnlock internal unlock;

    mapping(bytes32 => IPublicLock) lockToKey;

    constructor() public {
        unlock = IUnlock(0xD8C88BE5e8EB88E38E6ff5cE186d764676012B0b);
    }

    function setLockAddress(address payable adr, bytes32 key)
        external
        onlyOwner
    {
        lockToKey[key] = IPublicLock(adr);
    }

    function createNewLock(bytes32 key) internal {
        unlock.createLock(
            100,
            address(0),
            100000000000000,
            20,
            "blu",
            bytes12(keccak256(abi.encodePacked(key)))
        );
        IPublicLock lock = IPublicLock(address(0)); //TODO fetch address from event -> possible??
        lockToKey[key] = lock;
    }

    function getKeyPrice(bytes32 key) external view returns (uint256) {
        return lockToKey[key].keyPrice();
    }

    function updateKeyPrice(bytes32 key, uint256 keyPrice) external {
        lockToKey[key].updateKeyPricing(keyPrice, address(0));
    }

    function getLock(bytes32 key) public view returns (IPublicLock) {
        return lockToKey[key];
    }
}
