const airdrop_addr = "0x5Ead792bEb1756B5a1948102832829F516F772c9";
const pool_lp_addr = "0x6CC595Ec286b387ca576C00B396658a9464cDF89"
const trading_reward_addr = "0xE2A7bCfB837a8644D811f6c18a10EcaC26c67cef";
const helixmeta_token_addr = "0x3a5198947E93600074521D436e897C801F02C8f1"

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
  res = await contract.methods.transfer(trading_reward_addr, "30000000000000000000000000").send({from: account[0]});
  console.log(res)
}
run();
