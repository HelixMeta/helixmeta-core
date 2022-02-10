const HelixmetaAirdrop = artifacts.require("HelixmetaAirdrop");
const HelixmetaToken = artifacts.require("HelixmetaToken");
const TransferManagerERC721 = artifacts.require("TransferManagerERC721");
const TransferManagerERC1155 = artifacts.require("TransferManagerERC1155");
const StrategyStandardSaleForFixedPrice = artifacts.require("StrategyStandardSaleForFixedPrice");

module.exports = async function (deployer) {
  await deployer.deploy(
    HelixmetaAirdrop,
    process.env.END_TIMESTAMP,
    process.env.MAXIMUM_AMOUNT_TO_CLAIM,
    (
      await HelixmetaToken.deployed()
    ).address,
    process.env.DOMAIN_SEPARATOR_EXCHANGE,
    (
      await TransferManagerERC721.deployed()
    ).address,
    (
      await TransferManagerERC1155.deployed()
    ).address,
    (
      await StrategyStandardSaleForFixedPrice.deployed()
    ).address,
    process.env.WETH,
  );
  await HelixmetaAirdrop.deployed();
};
