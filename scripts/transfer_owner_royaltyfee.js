const royalty_fee_register_addr = "0xD7Ce809ebce2Ba7749CF3B1E67a406bE86d698FD";
const royalty_fee_setter_addr = "0x2081d8Fd9b0F3e8B521A31F3561e4f9F71E683B1";
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
