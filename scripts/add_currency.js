const currency_manager_addr = "0x7a343235105020b7C5Fa34Ad33Bc2E8fAB01F9EB";
const HLM_token = "0x6E94679a254b23CB97A6b8961C90b8f12D23776D"
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
  await currency_manager.methods.addCurrency(WETH).send({from: account[0]});
  await currency_manager.methods.addCurrency(HLM_token).send({from: account[0]});
}
run();
