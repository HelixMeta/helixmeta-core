const RoyaltyFeeRegistry = artifacts.require("RoyaltyFeeRegistry");
const RoyaltyFeeSetter = artifacts.require("RoyaltyFeeSetter");


module.exports = async function (deployer) {
  
  await deployer.deploy(
    RoyaltyFeeRegistry,
    process.env.ROYALTY_FEE_LIMIT
  );
  const royalty_fee_registry = await RoyaltyFeeRegistry.deployed();

  await deployer.deploy(
    RoyaltyFeeSetter,
    royalty_fee_registry.address
  );
  await RoyaltyFeeSetter.deployed();

};
