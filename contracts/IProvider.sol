// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "./IOwner.sol";

interface IProvider {
    struct ProviderStruct {
        bytes32 providerId;
        bytes32[] unitKeys;
        string name;
    }

    function getProviderCount() external view returns (uint256);

    function isProvider(bytes32 providerId) external view returns (bool);

    function getProviderUnitCount(bytes32 providerId)
        external
        view
        returns (uint256);

    function getProviderUnitAtIndex(bytes32 providerId, uint256 row)
        external
        view
        returns (bytes32);

    function getAllProviders() external view returns (ProviderStruct[] memory);

    function createProvider(string calldata name) external returns (bool);

    function deleteProvider(bytes32 providerId) external returns (bool);
}
