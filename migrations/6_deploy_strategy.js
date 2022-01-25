const StrategyStandardSaleForFixedPrice = artifacts.require("StrategyStandardSaleForFixedPrice");
const StrategyAnyItemFromCollectionForFixedPrice = artifacts.require("StrategyAnyItemFromCollectionForFixedPrice");
const StrategyPrivateSale = artifacts.require("StrategyPrivateSale");


module.exports = async function (deployer) {
  
  await deployer.deploy(
    StrategyStandardSaleForFixedPrice,
    process.env.PROTOCOL_FEE
  );
  await StrategyStandardSaleForFixedPrice.deployed();

  await deployer.deploy(
    StrategyAnyItemFromCollectionForFixedPrice,
    process.env.PROTOCOL_FEE
  );
  await StrategyAnyItemFromCollectionForFixedPrice.deployed();

  await deployer.deploy(
    StrategyPrivateSale,
    process.env.PROTOCOL_FEE
  );
  await StrategyPrivateSale.deployed();
};
