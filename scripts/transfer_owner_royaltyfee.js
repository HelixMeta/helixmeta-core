const royalty_fee_register_addr = "0x666993E157397317dB1C210Ae1e07f2201870805";
const royalty_fee_setter_addr = "0x7F3F1CE18E66925E23AE63a640AAB59E4F3C1800";
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
  const account = await web3.eth.getAccounts();
  const royalty_fee_registry = new web3.eth.Contract(
    RoyaltyFeeRegistry,
    royalty_fee_register_addr
  );
  const res = await royalty_fee_registry.methods
    .transferOwnership(royalty_fee_setter_addr)
    .send({ from: account[0] });
  console.log(res);
}
run();
