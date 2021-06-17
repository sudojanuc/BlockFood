const ReservationHandler = artifacts.require("ReservationHandler");
const Provider = artifacts.require("Provider");
const Unit = artifacts.require("Unit");
const Reservation = artifacts.require("Reservation");

module.exports = function (deployer) {
  var provider, reservation, unit, reservationHander;
  deployer
    .deploy(Provider)
    // .deploy(Provider, { overwrite: false })
    .then(function (instance) {
      provider = instance;
      return deployer.deploy(Unit, Provider.address);
      // return deployer.deploy(Unit, { overwrite: false });
    })
    .then(function (instance) {
      unit = instance;
      return deployer.deploy(Reservation, Unit.address);
      // return deployer.deploy(Reservation, { overwrite: false });
    })
    .then(function (instance) {
      reservation = instance;
      return deployer.deploy(
        ReservationHandler,
        Provider.address,
        Unit.address,
        Reservation.address
      );
      // return deployer.deploy(ReservationHandler, { overwrite: false });
    })
};
