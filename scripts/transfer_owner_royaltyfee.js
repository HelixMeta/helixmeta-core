const royalty_fee_register_addr = "0xa185D27B6137E9bF88846e00e188c2cc0C1720c9";
const royalty_fee_setter_addr = "0x0bad9F8929dd972650a8FdEF5a93a2B49104C297"
require("dotenv").config({ path: ".env" });
const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const RoyaltyFeeRegistry = jsonfile.readFileSync(
  "build/contracts/RoyaltyFeeRegistry.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts()
  const royalty_fee_registry = new web3.eth.Contract(
    RoyaltyFeeRegistry,
    royalty_fee_register_addr
  );
  await royalty_fee_registry.methods.transferOwnership(royalty_fee_setter_addr).send({from: account[0]});
}
run();
