const jsonfile = require("jsonfile");

const StakingPoolForUniswapV2Tokens = jsonfile.readFileSync(
  "build/contracts/StakingPoolForUniswapV2Tokens.json"
).abi;
const IUniswapV2Pair = jsonfile.readFileSync(
  "build/contracts/IUniswapV2Pair.json"
).abi;

const staked_token_address = process.env.STAKED_POOL;
const lp_staking_address = "0x747da21272d370B1a46B32f42D527Ac270ff8abE";

contract("lp staking reward", function () {
  it("should deposit with staked token by acc 1", async function () {
    const accounts = await web3.eth.getAccounts();
    //approve staked token
  const staked_token = new web3.eth.Contract(
    IUniswapV2Pair,
    staked_token_address
  );
    await staked_token.methods
      .approve(lp_staking_address, "100000000000000000")
      .send({
        from: accounts[1],
      });

    // deposit
    const staking_pool = new web3.eth.Contract(
      StakingPoolForUniswapV2Tokens,
      lp_staking_address
    );

  const result = await staking_pool.methods
  .deposit("10000000000000000")
  .send({
    from: accounts[1],
  });
  });

  it("should harvest with staked token with acc 1", async function () {
    const accounts = await web3.eth.getAccounts();

    const staking_pool = new web3.eth.Contract(
      StakingPoolForUniswapV2Tokens,
      lp_staking_address
    );

    const result = await staking_pool.methods.harvest().send({
      from: accounts[1],
    });
  });

  it("should withdraw", async function () {
    const accounts = await web3.eth.getAccounts();

    const staking_pool = new web3.eth.Contract(
      StakingPoolForUniswapV2Tokens,
      lp_staking_address
    );

    const result = await staking_pool.methods.withdraw("10000000000000000").send({
      from: accounts[1],
    });
  })

});
