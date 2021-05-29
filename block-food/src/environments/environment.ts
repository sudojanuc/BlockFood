// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  network: 'Kovan',
  address: '0x80651894BA59EFe325Ac52892DC4be8782Ec52cD',
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isCreated",
              "type": "bool"
            }
          ],
          "indexed": false,
          "internalType": "struct ReservationManager.Provider",
          "name": "provider",
          "type": "tuple"
        }
      ],
      "name": "NewProvider",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "providerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "providerName",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "possibleGuestCount",
              "type": "uint16"
            },
            {
              "internalType": "bool",
              "name": "isCreated",
              "type": "bool"
            }
          ],
          "indexed": false,
          "internalType": "struct ReservationManager.ReservationUnit",
          "name": "reservationUnit",
          "type": "tuple"
        }
      ],
      "name": "NewReservationUnit",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "createProvider",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "guestCount",
          "type": "uint16"
        }
      ],
      "name": "createReservationUnit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProviders",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isCreated",
              "type": "bool"
            }
          ],
          "internalType": "struct ReservationManager.Provider[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentProvider",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isCreated",
              "type": "bool"
            }
          ],
          "internalType": "struct ReservationManager.Provider",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getReservationUnits",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "possibleGuestCount",
              "type": "uint16"
            },
            {
              "internalType": "bool",
              "name": "isCreated",
              "type": "bool"
            }
          ],
          "internalType": "struct ReservationManager.ReservationUnit[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getReservationUnitsOfProvider",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "possibleGuestCount",
              "type": "uint16"
            },
            {
              "internalType": "bool",
              "name": "isCreated",
              "type": "bool"
            }
          ],
          "internalType": "struct ReservationManager.ReservationUnit[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
