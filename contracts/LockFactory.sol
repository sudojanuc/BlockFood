// SPDX-License-Identifier: MIT

pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./interfaces/unlock/IPublicLock.sol";
import "./interfaces/unlock/IUnlock.sol";

import "./Owned.sol";

contract LockFactory is Owned {
    IUnlock internal unlock;

    mapping(bytes32 => IPublicLock) lockToKey;

    function setLockAddress(address payable adr, bytes32 key)
        external
        onlyOwner
    {
        lockToKey[key] = IPublicLock(adr);
    }

    function initializeUnlock() public {
        unlock.initialize(msg.sender);
    }

    function createNewLock(bytes32 key) internal {
        //unlock.createLock(_expirationDuration, _tokenAddress, _keyPrice, _maxNumberOfKeys, _lockName, _salt);
        IPublicLock lock =
            IPublicLock(0x2D7Fa4dbdF5E7bfBC87523396aFfD6d38c9520fa);
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
