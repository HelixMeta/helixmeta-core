const TransferManagerERC721 = artifacts.require("TransferManagerERC721");
const TransferManagerERC1155 = artifacts.require("TransferManagerERC1155");
const TransferManagerNonCompliantERC721 = artifacts.require(
  "TransferManagerNonCompliantERC721"
);
const TransferSelectorNFT = artifacts.require("TransferSelectorNFT");

const HelixmetaExchange = artifacts.require("HelixmetaExchange");

module.exports = async function (deployer) {
  await deployer.deploy(
    TransferManagerERC721,
    (
      await HelixmetaExchange.deployed()
    ).address
  );

  await deployer.deploy(
    TransferManagerERC1155,
    (
      await HelixmetaExchange.deployed()
    ).address
  );

  await deployer.deploy(
    TransferManagerNonCompliantERC721,
    (
      await HelixmetaExchange.deployed()
    ).address
  );

  await deployer.deploy(
    TransferSelectorNFT,
    TransferManagerERC721.address,
    TransferManagerERC1155.address
  );
  await TransferSelectorNFT.deployed();
};
