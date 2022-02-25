const HelixmetaToken = artifacts.require("HelixmetaToken");

module.exports = async function (deployer) {
  const totalSupply = "1000000000000000000000000000";
  const pre_mint = "170000000000000000000000000";
  await deployer.deploy(
    HelixmetaToken,
    process.env.PRE_MINT_ADDRESS,
    pre_mint,
    totalSupply
  );
  await HelixmetaToken.deployed();
};
