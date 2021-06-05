const ReservationHandler = artifacts.require("ReservationHandler");
const Provider = artifacts.require("Provider");
const Unit = artifacts.require("Unit");
const Reservation = artifacts.require("Reservation");

module.exports = function (deployer) {
  deployer.deploy(Provider).then(function() {
    return deployer.deploy(Unit, Provider.address)
  }).then(function(){
    return deployer.deploy(Reservation,Unit.address)
  }).then(function() {
    return deployer.deploy(ReservationHandler,Reservation.address, Unit.address, Provider.address);
  });
}