const token_distributor = "0x5cDDd19C1e88E04dA6d1b134669ead765C1056B5";
const HLM_token = "0x895A58524fCDA6d6feCe85D3e575bA045aEa854A"
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
