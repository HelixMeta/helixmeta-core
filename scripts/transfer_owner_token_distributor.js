const token_distributor = "0x1615985C5A01DbF0779c52869e44E250DCe918C4";
const HLM_token = "0x3a5198947E93600074521D436e897C801F02C8f1"
require("dotenv").config({ path: ".env" });
const WETH = process.env.WETH;
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
  const token = new web3.eth.Contract(
    HelixmetaToken,
    HLM_token
  );

  const res = await token.methods.transferOwnership(token_distributor).send({from: account[0]});
  console.log(res)
}
run();
