const token_distributor = "0x62fA9e216381806463Eb7Ae150139d18e8fAA0a3";
const HLM_token = "0xa4826C8E672c958Ddb34Ca9C1E02Ea9d43e7B277"
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

  await token.methods.transferOwnership(token_distributor).send({from: account[0]});
}
run();
