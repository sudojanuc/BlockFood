// SPDX-License-Keyentifier: MIT
pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "./unlock/IPublicLock.sol";

interface IProvider {
    struct ProviderStruct {
        address owner;
        bytes32 providerKey;
        bytes32[] unitKeys;
        string name;
        uint8 timePerReservation;
    }

    function isProviderOwner(address sender, bytes32 providerKey)
        external
        view
        returns (bool);

    function getAllProviders() external view returns (ProviderStruct[] memory);

    function renameProvider(
        address sender,
        bytes32 providerKey,
        string calldata newName
    ) external;

    function createProvider(address sender, string calldata name, uint8 timePerReservation)
        external
        returns (ProviderStruct memory);

    function deleteProvider(address sender, bytes32 providerKey)
        external
        returns (bytes32);

    function getKeyPrice(bytes32 key) external view returns (uint256);

    function updateKeyPrice(bytes32 key, uint256 keyPrice) external;

    function getLock(bytes32 key) external view returns (IPublicLock);

    function setBuissnesHours(
        address sender,
        bytes32 key,
        uint8 weekDayType,
        uint8 startHour,
        uint8 endHour
    ) external;

    function getBuissnesHours(bytes32 key, uint8 weekDayType)
        external
        view
        returns (uint8 start, uint8 end);
}
