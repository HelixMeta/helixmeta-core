const currency_manager_addr = "0x576Ee42B42298B376838D0bb81Fe21E3177a2aCD";
const HLM_token = "0x3a5198947E93600074521D436e897C801F02C8f1"
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
