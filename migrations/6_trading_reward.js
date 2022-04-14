const HelixmetaToken = artifacts.require("HelixmetaToken");

const TradingRewardsDistributor = artifacts.require(
  "TradingRewardsDistributor"
);

module.exports = async function (deployer) {
  await deployer.deploy(TradingRewardsDistributor, (await HelixmetaToken.deployed()).address);
};
