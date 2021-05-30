// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  network: 'Kovan',
  address2: '0x8804E7A84E0a629f1f7115A8Fe2947ed4627Fba9',
  abi2: [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reservationUnitId","type":"uint256"}],"name":"createReservation","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getKeyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservations","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationContract.Reservation[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservationsOfOwner","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationContract.Reservation[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"reservationUnitId","type":"uint256"}],"name":"getReservationsOfUnit","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"},{"internalType":"string","name":"providerName","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationContract.Reservation[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reservationId","type":"uint256"},{"internalType":"uint256","name":"checkInKey","type":"uint256"}],"name":"refundReservation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reservationId","type":"uint256"}],"name":"withdrawReservationFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
  address: '0x991C282c6E2b6D4c274F77EB0423761F89830AD6',
  "abi": [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"indexed":false,"internalType":"struct ReservationManager.Provider","name":"provider","type":"tuple"}],"name":"NewProvider","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"providerId","type":"uint256"},{"indexed":false,"internalType":"string","name":"providerName","type":"string"},{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"uint256","name":"reservationCount","type":"uint256"},{"internalType":"bool","name":"isCreated","type":"bool"}],"indexed":false,"internalType":"struct ReservationManager.ReservationUnit","name":"reservationUnit","type":"tuple"}],"name":"NewReservationUnit","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"createProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint16","name":"guestCount","type":"uint16"}],"name":"createReservationUnit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentProvider","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.Provider","name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getProviderOfUnit","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.Provider","name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProviders","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.Provider[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReservationUnits","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"uint256","name":"reservationCount","type":"uint256"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.ReservationUnit[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getReservationUnitsOfProvider","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"possibleGuestCount","type":"uint16"},{"internalType":"uint256","name":"reservationCount","type":"uint256"},{"internalType":"bool","name":"isCreated","type":"bool"}],"internalType":"struct ReservationManager.ReservationUnit[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"unitId","type":"uint256"}],"name":"increaseUnitReservationCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
