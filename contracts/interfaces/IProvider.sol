// SPDX-License-Keyentifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

interface IProvider {
    struct ProviderStruct {
        address owner;
        bytes32 providerKey;
        bytes32[] unitKeys;
        string name;
    }

    function isProviderOwner(address sender, bytes32 providerKey)
        external
        view
        returns (bool);

    function getAllProviders() external view returns (ProviderStruct[] memory);

    function createProvider(address sender, string calldata name)
        external
        returns (ProviderStruct memory);

    function deleteProvider(address sender, bytes32 providerKey) external returns (bytes32);
}
