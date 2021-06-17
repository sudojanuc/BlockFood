// SPDX-License-Identifier: MIT

pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./AccessRestriction.sol";

contract ParentNode is AccessRestriction {
    address public child;

    function setChild(address childAdr) public onlyRemote {
        child = childAdr;
    }
}
