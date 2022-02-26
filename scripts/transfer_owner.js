const token_distributor = "0xbffF48114874f55354c1BE1F6B450bCa9FF8666B";
const HLM_token = "0x6E94679a254b23CB97A6b8961C90b8f12D23776D"
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
