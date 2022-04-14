const StakingPoolForUniswapV2Tokens = artifacts.require(
  "StakingPoolForUniswapV2Tokens"
);
const HelixmetaToken = artifacts.require("HelixmetaToken");

module.exports = async function (deployer) {
  await deployer.deploy(
    StakingPoolForUniswapV2Tokens,
    process.env.STAKED_POOL,
    (
      await HelixmetaToken.deployed()
    ).address,
    process.env.REWARD_PER_BLOCK,
    process.env.STARTBLOCK_POOL,
    process.env.ENDBLOCK_POOL
  );
};
