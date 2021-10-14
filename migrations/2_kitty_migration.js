const KittyToken = artifacts.require("KittyContract");

module.exports = function (deployer) {
  deployer.deploy(KittyToken);
};
