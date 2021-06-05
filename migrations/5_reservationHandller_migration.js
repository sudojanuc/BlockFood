const ReservationHandler = artifacts.require("ReservationHandler");

module.exports = function (deployer) {
  deployer.deploy(ReservationHandler);
};
