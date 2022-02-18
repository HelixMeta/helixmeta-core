const jsonfile = require("jsonfile");

const TradingRewardsDistributor = jsonfile.readFileSync(
  "build/contracts/TradingRewardsDistributor.json"
).abi;

const trading_reward_address = "0x13233ab1643Dc340781943A62C64e16DC9eE9F8B";

function hash_acc_and_amount(acc_addr, amount) {
  return web3.utils.sha3(
    "0x" +
      acc_addr.toLowerCase().slice(2) +
      BigInt(amount.toString()).toString(16).padStart(64, "0")
  );
}

function hash_hash(hash1, hash2) {
  if (hash1 >= hash2) return web3.utils.sha3(hash2 + hash1.slice(2));
  else return web3.utils.sha3(hash1 + hash2.slice(2));
}
contract("trading reward", function () {
  // Assign trading nft account and amount
  const acc = [
    "0x256628a73776058Da1673dFC0315039e40DD30Eb",
    "0x1bb21FE614cA37A5FA13c2BAAb42465C2E574a46",
    "0xf3e75D0643CAD65B50F54EDa4253F7206692536e",
  ];
  const amount = ["1000000000000000", "2430000000000000", "10000000000000"];
  var hash_acc_amount = [];
  for (var i = 0; i < acc.length; i++) {
    hash_acc_amount[i] = hash_acc_and_amount(acc[i], amount[i]);
    console.log(hash_acc_amount[i])
  }
  var root = hash_acc_amount[0];
  for (var i = 1; i < acc.length; i++) {
    root = hash_hash(root, hash_acc_amount[i]);
  }
  
  it("should update trading rewards", async function () {
    const accounts = await web3.eth.getAccounts();

    //  load exchange contract
    const trading_reward_instance = new web3.eth.Contract(
      TradingRewardsDistributor,
      trading_reward_address
    );

    const result = await trading_reward_instance.methods
      .updateTradingRewards(root, "1000000000000000")
      .send({
        from: accounts[0],
      });
    console.log(result);
  });


  it("should claim with correct amount", async function() {
    const accounts = await web3.eth.getAccounts();

    //  load exchange contract
    const trading_reward_instance = new web3.eth.Contract(
      TradingRewardsDistributor,
      trading_reward_address
    );

    const result = await trading_reward_instance.methods
      .claim(amount[0],[hash_acc_amount[1],hash_acc_amount[2]])
      .send({
        from: accounts[1],
      });
    // console.log(result);
  })

});
