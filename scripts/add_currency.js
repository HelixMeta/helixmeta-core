const currency_manager_addr = "0xFF6F3929e93CC137a74A66a2D92fA83a0af1714E";
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
  const account = await web3.eth.getAccounts();
  const currency_manager = new web3.eth.Contract(
    CurrencyManager,
    currency_manager_addr
  );

  var res = await currency_manager.methods
    .addCurrency(WETH)
    .send({ from: account[0] });
  console.log(res);
}
run();
