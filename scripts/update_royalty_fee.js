
const royalty_setter = "0x1489dAf829277BF2b0431C1A5d94e0835e598096";
const setter = "0x1bb21FE614cA37A5FA13c2BAAb42465C2E574a46"
const collection = "0xd32bF03cd1B50c189B0506e7Ef121a1143d97af0"
require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const RoyaltyFeeSetter = jsonfile.readFileSync(
  "build/contracts/RoyaltyFeeSetter.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts();
  const set_royalty = new web3.eth.Contract(
    RoyaltyFeeSetter,
    royalty_setter
  );

  const res = await set_royalty.methods
    .updateRoyaltyInfoForCollectionIfOwner(collection, setter, setter, 150)
    .send({ from: account[0] });
    console.log(res)
}
run();
