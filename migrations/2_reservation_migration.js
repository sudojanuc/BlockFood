const ReservationManager = artifacts.require("ReservationManager");

module.exports = function (deployer) {
  deployer.deploy(ReservationManager);
};
