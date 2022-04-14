const HelixmetaExchange = artifacts.require("HelixmetaExchange");
const CurrencyManager = artifacts.require("CurrencyManager");
const ExecutionManager = artifacts.require("ExecutionManager");
const RoyaltyFeeManager = artifacts.require("RoyaltyFeeManager");
const FeeSharingSetter = artifacts.require("FeeSharingSetter");

module.exports = async function (deployer) {
  const currency_manager_address = (await CurrencyManager.deployed()).address;
  const execution_manager_address = (await ExecutionManager.deployed()).address;
  const royalty_fee_manager_address = (await RoyaltyFeeManager.deployed())
    .address;

  await deployer.deploy(
    HelixmetaExchange,
    currency_manager_address,
    execution_manager_address,
    royalty_fee_manager_address,
    process.env.WETH,
    (
      await FeeSharingSetter.deployed()
    ).address
  );
  await HelixmetaExchange.deployed();
};
