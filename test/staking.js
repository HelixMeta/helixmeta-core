const jsonfile = require("jsonfile");

const FeeSharingSystem = jsonfile.readFileSync(
  "build/contracts/FeeSharingSystem.json"
).abi;
const HelixmetaToken = jsonfile.readFileSync(
  "build/contracts/HelixmetaToken.json"
).abi;

const fee_sharing_system_address = "0xfBBe9e9aE79bE5bdA8CCDF8Dfa5F7920145B94E1";
const helixmeta_token_address = "0x9BAf798DF6786E05A29C496d37756F1F81fCF008";

contract("lp staking reward", function () {
    it("should update reward by owner", async function () {
      const accounts = await web3.eth.getAccounts();

    const staking_pool = new web3.eth.Contract(
      FeeSharingSystem,
      fee_sharing_system_address
    );
    const result = await staking_pool.methods
      .updateRewards("1000000000000000",6500)
      .send({
        from: accounts[1],
      });
  });
  it("should deposit with hlm token", async function () {
    const accounts = await web3.eth.getAccounts();

    //approve staking token
    const hlm_token = new web3.eth.Contract(
      HelixmetaToken,
      helixmeta_token_address
    );
    await hlm_token.methods
      .approve(fee_sharing_system_address, "100000000000000000000")
      .send({
        from: accounts[2],
      });

    const staking_pool = new web3.eth.Contract(
      FeeSharingSystem,
      fee_sharing_system_address
    );
    const result = await staking_pool.methods
      .deposit("1000000000000000000", false)
      .send({
        from: accounts[2],
      });
    console.log(result);
  });
  it("should harvest with weth token", async function () {
    const accounts = await web3.eth.getAccounts();

    const staking_pool = new web3.eth.Contract(
      FeeSharingSystem,
      fee_sharing_system_address
    );
    const result = await staking_pool.methods
      .harvest()
      .send({
        from: accounts[2],
      });
    console.log(result);
  });
it("should withdraw with hlm token", async function () {
    const accounts = await web3.eth.getAccounts();

    const staking_pool = new web3.eth.Contract(
      FeeSharingSystem,
      fee_sharing_system_address
    );
    const result = await staking_pool.methods
      .withdrawAll(true)
      .send({
        from: accounts[2],
      });
    // console.log(result);
  });
});
