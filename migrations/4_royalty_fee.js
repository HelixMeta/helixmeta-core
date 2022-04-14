const RoyaltyFeeRegistry = artifacts.require("RoyaltyFeeRegistry");
const RoyaltyFeeSetter = artifacts.require("RoyaltyFeeSetter");


module.exports = async function (deployer) {
  
  await deployer.deploy(
    RoyaltyFeeRegistry,
    process.env.ROYALTY_FEE_LIMIT
  );

  await deployer.deploy(
    RoyaltyFeeSetter,
    RoyaltyFeeRegistry.address
  );

};
