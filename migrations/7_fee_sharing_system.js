const FeeSharingSystem = artifacts.require("FeeSharingSystem");
const FeeSharingSetter = artifacts.require("FeeSharingSetter");
const HelixmetaToken = artifacts.require("HelixmetaToken");
const TokenDistributor = artifacts.require("TokenDistributor");
const TokenSplitter = artifacts.require("TokenSplitter");
const TradingRewardsDistributor = artifacts.require(
  "TradingRewardsDistributor"
);

module.exports = async function (deployer) {
  let account = process.env.ACCOUNT.split(" ");
  account[2] = (await TradingRewardsDistributor.deployed()).address;
  await deployer.deploy(
    TokenSplitter,
    account,
    process.env.SHARES.split(" "),
    (
      await HelixmetaToken.deployed()
    ).address
  );

  var reward_per_block_for_staking =
    process.env.REWARD_PER_BLOCK_FOR_STAKING.split(" ");
  var reward_per_block_for_other =
    process.env.REWARD_PER_BLOCK_FOR_OTHER.split(" ");
  var period_lengthes_in_blocks =
    process.env.PERIOD_LENGTHES_IN_BLOCKS.split(" ");
  await deployer.deploy(
    TokenDistributor,
    (
      await HelixmetaToken.deployed()
    ).address,
    TokenSplitter.address,
    process.env.STARTBLOCK,
    reward_per_block_for_staking,
    reward_per_block_for_other,
    period_lengthes_in_blocks,
    process.env.NUMBER_PERIODS
  );

  await deployer.deploy(
    FeeSharingSystem,
    (
      await HelixmetaToken.deployed()
    ).address,
    process.env.WETH,
    TokenDistributor.address
  );

  await deployer.deploy(
    FeeSharingSetter,
    FeeSharingSystem.address,
    process.env.MIN_REWARD_DURATION_IN_BLOCKS,
    process.env.MAX_REWARD_DURATION_IN_BLOCKS,
    process.env.REWARD_DURATION_IN_BLOCKS,
    process.env.PERCENT_FOR_FEE_STAKING
  );
};
