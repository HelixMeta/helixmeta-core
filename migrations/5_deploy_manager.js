const CurrencyManager = artifacts.require("CurrencyManager");
const ExecutionManager = artifacts.require("ExecutionManager");
const RoyaltyFeeManager = artifacts.require("RoyaltyFeeManager");
const RoyaltyFeeRegistry = artifacts.require("RoyaltyFeeRegistry");

module.exports = async function (deployer) {
  //deploy currency manager
  await deployer.deploy(CurrencyManager);

  //deploy execution manager
  await deployer.deploy(ExecutionManager);

  //deploy royalty fee manager
  await deployer.deploy(
    RoyaltyFeeManager,
    (
      await RoyaltyFeeRegistry.deployed()
    ).address
  );
};
