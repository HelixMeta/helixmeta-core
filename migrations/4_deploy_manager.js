const CurrencyManager = artifacts.require("CurrencyManager");
const ExecutionManager = artifacts.require("ExecutionManager");
const RoyaltyFeeManager = artifacts.require("RoyaltyFeeManager");
const RoyaltyFeeRegistry = artifacts.require("RoyaltyFeeRegistry");

module.exports = async function (deployer) {
  //deploy currency manager
  await deployer.deploy(CurrencyManager);
  await CurrencyManager.deployed();

  //deploy execution manager
  await deployer.deploy(ExecutionManager);
  await ExecutionManager.deployed();

  //deploy royalty fee manager
  await deployer.deploy(
    RoyaltyFeeManager,
    (
      await RoyaltyFeeRegistry.deployed()
    ).address
  );
  await RoyaltyFeeManager.deployed();
};
