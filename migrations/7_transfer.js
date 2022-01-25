const TransferManagerERC721 = artifacts.require("TransferManagerERC721");
const TransferManagerERC1155 = artifacts.require("TransferManagerERC1155");
const TransferManagerNonCompliantERC721 = artifacts.require("TransferManagerNonCompliantERC721");
const TransferSelectorNFT = artifacts.require("TransferSelectorNFT");

const LooksRareExchange = artifacts.require("LooksRareExchange");

module.exports = async function (deployer) {
  await deployer.deploy(
    TransferManagerERC721,
    (
      await LooksRareExchange.deployed()
    ).address
  );
  const transfer_manager_erc721 = await TransferManagerERC721.deployed();

  await deployer.deploy(
    TransferManagerERC1155,
    (
      await LooksRareExchange.deployed()
    ).address
  );
  const transfer_manager_erc1155 = await TransferManagerERC1155.deployed();

  await deployer.deploy(
    TransferManagerNonCompliantERC721,
    (
      await LooksRareExchange.deployed()
    ).address
  );
  await TransferManagerNonCompliantERC721.deployed();

  await deployer.deploy(
    TransferSelectorNFT,
    transfer_manager_erc721.address,
    transfer_manager_erc1155.address
  );
  await TransferSelectorNFT.deployed();
};
