const PrivateSaleWithFeeSharing = artifacts.require(
  "PrivateSaleWithFeeSharing"
);
const HelixmetaToken = artifacts.require("HelixmetaToken");

module.exports = async function (deployer) {
  await deployer.deploy(
    PrivateSaleWithFeeSharing,
    (
      await HelixmetaToken.deployed()
    ).address,
    process.env.WETH,
    process.env.MAX_BLOCK_FOR_WITHDRAWAL,
    process.env.TOTAL_HLM_DISTRIBUTED
  );
};
