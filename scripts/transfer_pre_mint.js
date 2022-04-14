const airdrop_addr = "0xF83855ff63e43571AfDc800f51a9f25633035064";
const pool_lp_addr = "0x24EF4d843f52A915099bfEf8262B6180565309bE";
const trading_reward_addr = "0xb7D8C1C36135151c1c892C28908b0070B7E9CcE5";
const private_sale_fee_sharing = "0x5336e3EfB415aC86FA0A8182DB674f121945b85E";
const helixmeta_token_addr = "0x895A58524fCDA6d6feCe85D3e575bA045aEa854A";

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
  const account = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(HelixmetaToken, helixmeta_token_addr);
  var res = await contract.methods
    .transfer(airdrop_addr, "120000000000000000000000000")
    .send({ from: account[0] });
  console.log(res);
  res = await contract.methods
    .transfer(pool_lp_addr, "5000000000000000000000000")
    .send({ from: account[0] });
  console.log(res);
  res = await contract.methods
    .transfer(trading_reward_addr, "30000000000000000000000000")
    .send({ from: account[0] });
  console.log(res);
  res = await contract.methods
    .transfer(private_sale_fee_sharing, "15000000000000000000000000")
    .send({ from: account[0] });
  console.log(res);
}
run();
