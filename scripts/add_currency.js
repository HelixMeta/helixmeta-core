const currency_manager_addr = "0x4EEc801bD061771B27c201449eB1EA761a45c6fd";
const HLM_token = "0xa4826C8E672c958Ddb34Ca9C1E02Ea9d43e7B277"
require("dotenv").config({ path: ".env" });
const WETH = process.env.WETH;
const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const CurrencyManager = jsonfile.readFileSync(
  "build/contracts/CurrencyManager.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts()
  const currency_manager = new web3.eth.Contract(
    CurrencyManager,
    currency_manager_addr
  );
  var res = await currency_manager.methods.addCurrency(WETH).send({from: account[0]});
  console.log(res)
  res = await currency_manager.methods.addCurrency(HLM_token).send({from: account[0]});
  console.log(res)
}
run();
