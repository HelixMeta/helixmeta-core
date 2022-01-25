const LooksRareToken = artifacts.require("LooksRareToken");

module.exports = async function (deployer) {
  const totalSupply = "1000000000000000000000000000";
  const pre_mint = "10000000000000000000";
  await deployer.deploy(
    LooksRareToken,
    process.env.PRE_MINT_ADDRESS,
    pre_mint,
    totalSupply
  );
  await LooksRareToken.deployed();
};
