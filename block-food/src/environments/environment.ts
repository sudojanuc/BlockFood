// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // network: 'Kovan',
  // address2: '0xCc1003a6E90eDfE62301E290CBAAf82D58A33Cf1',
  // abi2: [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"indexed":false,"internalType":"struct ReservationContract.Reservation","name":"reservation","type":"tuple"}],"name":"CreateReservation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"indexed":false,"internalType":"struct ReservationContract.Reservation","name":"reservation","type":"tuple"}],"name":"RefundReservation","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reservationUnitId","type":"uint256"}],"name":"createReservation","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getKeyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservations","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationContract.Reservation[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservationsOfOwner","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationContract.Reservation[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"reservationUnitId","type":"uint256"}],"name":"getReservationsOfUnit","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationContract.Reservation[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reservationId","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"}],"name":"refundReservation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
  // address: '0xCe0EB24B899B1491875a5ed71ECEc1A3fa5a99fc',
  // abi: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"indexed":false,"internalType":"struct ReservationManager.Provider","name":"provider","type":"tuple"}],"name":"NewProvider","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"uint256","name":"reservationCount","type":"uint256"},{"internalType":"bool","name":"isCreated","type":"bool"}],"indexed":false,"internalType":"struct ReservationManager.ReservationUnit","name":"reservationUnit","type":"tuple"}],"name":"NewReservationUnit","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"createProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint16","name":"guestCount","type":"uint16"}],"name":"createReservationUnit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"unitId","type":"uint256"}],"name":"decreaseUnitReservationCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentProvider","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.Provider","name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getProviderOfUnit","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.Provider","name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProviders","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.Provider[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservationUnits","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"uint256","name":"reservationCount","type":"uint256"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.ReservationUnit[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getReservationUnitsOfProvider","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"uint256","name":"reservationCount","type":"uint256"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.ReservationUnit[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"unitId","type":"uint256"}],"name":"increaseUnitReservationCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  address: '0x8b3528a43fE4D5Ad29Ad092020e50a9Ea4062a4e',
  abi: 
  [{"inputs":[{"internalType":"address","name":"adrProvider","type":"address"},{"internalType":"address","name":"adrUnit","type":"address"},{"internalType":"address","name":"adrReservation","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"addRemote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"createProvider","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"unitId","type":"bytes32"}],"name":"createReservation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"providerId","type":"bytes32"},{"internalType":"uint16","name":"guestCount","type":"uint16"}],"name":"createUnit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"providerId","type":"bytes32"}],"name":"deleteProvider","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"reservationId","type":"bytes32"}],"name":"deleteReservation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"unitId","type":"bytes32"}],"name":"deleteUnit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllProviders","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes32","name":"providerId","type":"bytes32"},{"internalType":"bytes32[]","name":"unitKeys","type":"bytes32[]"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct IProvider.ProviderStruct[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllReservations","outputs":[{"components":[{"internalType":"bytes32","name":"reservationId","type":"bytes32"},{"internalType":"bytes32","name":"unitKey","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"}],"internalType":"struct IReservation.ReservationStruct[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllUnits","outputs":[{"components":[{"internalType":"bytes32","name":"unitId","type":"bytes32"},{"internalType":"bytes32","name":"providerKey","type":"bytes32"},{"internalType":"bytes32[]","name":"reservationKeys","type":"bytes32[]"},{"internalType":"uint16","name":"guestCount","type":"uint16"}],"internalType":"struct IUnit.UnitStruct[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProviderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"providerId","type":"bytes32"},{"internalType":"uint256","name":"row","type":"uint256"}],"name":"getProviderUnitAtIndex","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"providerId","type":"bytes32"}],"name":"getProviderUnitCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUnitCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"providerId","type":"bytes32"}],"name":"isProvider","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"providerId","type":"bytes32"}],"name":"isProviderOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"reservationId","type":"bytes32"}],"name":"isReservation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"unitId","type":"bytes32"}],"name":"isUnit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"reservationId","type":"bytes32"},{"internalType":"uint256","name":"checkInKey","type":"uint256"}],"name":"refundReservation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"remote","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"setProviderAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"setReservationAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"setUnitAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
