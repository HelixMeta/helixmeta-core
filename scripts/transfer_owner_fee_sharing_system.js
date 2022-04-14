const fee_sharing_system_addr = "0x5461481C43eA680536Dbf13B20815b428833E8d0";
const fee_sharing_setter = "0x8BE19926545D2CECdE87F21714a27c7F4a7de0Dd"
require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const FeeSharingSystem = jsonfile.readFileSync(
  "build/contracts/FeeSharingSystem.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts()
  const contract = new web3.eth.Contract(
    FeeSharingSystem,
    fee_sharing_system_addr
  );

  const res = await contract.methods.transferOwnership(fee_sharing_setter).send({from: account[0]});
  console.log(res)
}
run();
