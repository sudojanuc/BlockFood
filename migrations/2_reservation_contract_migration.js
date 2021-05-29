const ReservationContract = artifacts.require("ReservationContract");

module.exports = function (deployer) {
  deployer.deploy(ReservationContract);
};
