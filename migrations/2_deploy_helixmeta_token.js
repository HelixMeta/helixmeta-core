const HelixmetaToken = artifacts.require("HelixmetaToken");

module.exports = async function (deployer) {

  await deployer.deploy(
    HelixmetaToken,
    process.env.PRE_MINT_ADDRESS,
    process.env.PRE_MINT,
    process.env.TOTAL_SUPPLY
  );
};
