const LooksRareToken = artifacts.require("LooksRareToken");

const TradingRewardsDistributor = artifacts.require(
  "TradingRewardsDistributor"
);

module.exports = async function (deployer) {
  await deployer.deploy(TradingRewardsDistributor, (await LooksRareToken.deployed()).address);
  await TradingRewardsDistributor.deployed();
};
