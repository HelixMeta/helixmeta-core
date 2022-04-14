const StrategyStandardSaleForFixedPrice = artifacts.require(
  "StrategyStandardSaleForFixedPrice"
);
const StrategyAnyItemFromCollectionForFixedPrice = artifacts.require(
  "StrategyAnyItemFromCollectionForFixedPrice"
);
const StrategyPrivateSale = artifacts.require("StrategyPrivateSale");

module.exports = async function (deployer) {
  await deployer.deploy(
    StrategyStandardSaleForFixedPrice,
    process.env.PROTOCOL_FEE
  );

  await deployer.deploy(
    StrategyAnyItemFromCollectionForFixedPrice,
    process.env.PROTOCOL_FEE
  );

  await deployer.deploy(StrategyPrivateSale, process.env.PROTOCOL_FEE);
};
