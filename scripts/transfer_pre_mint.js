const airdrop_addr = "0x4000bC590dE3c17E8Ff11732C2582A995AA16481";
const pool_lp_addr = "0x4D190cf9A0d3cC4d7f444a24A363c50D49c37af9"
const trading_reward_addr = "0x24BAf37B0A82ce69d26531cFD450a9745A7e1f61";
const helixmeta_token_addr = "0xa4826C8E672c958Ddb34Ca9C1E02Ea9d43e7B277"

require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const HelixmetaToken = jsonfile.readFileSync(
  "build/contracts/HelixmetaToken.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts()
  const contract = new web3.eth.Contract(
    HelixmetaToken,
    helixmeta_token_addr
  );
  var res = await contract.methods.transfer(airdrop_addr,"120000000000000000000000000").send({from:account[0]});
  console.log(res)
  res = await contract.methods.transfer(pool_lp_addr, "5000000000000000000000000").send({from: account[0]});
  console.log(res)
  res = await contract.methods.transfer(pool_lp_addr, "30000000000000000000000000").send({from: account[0]});
  console.log(res)
}
run();
