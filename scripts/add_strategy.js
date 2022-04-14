const execution_manager_addr = "0x8B6815Cc6DbbfD866cA1c6B719165657Cc9cB935";
const stardard_strategy = "0x489C6Ec7fcA930e97afEbFF8D30B43Fb1CAa34B6"
const collection_strategy = "0x304Ec6F615db587F5e3EbCc674C393Be412B5366"
const private_strategy = "0x8A4D73026fd9108def8F078Bc7E83FB48d819613"

require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const ExecutionManager = jsonfile.readFileSync(
  "build/contracts/ExecutionManager.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts()
  const execution_manager = new web3.eth.Contract(
    ExecutionManager,
    execution_manager_addr
  );
  
  var res = await execution_manager.methods.addStrategy(stardard_strategy).send({from: account[0]});
  console.log(res)  
  res = await execution_manager.methods.addStrategy(collection_strategy).send({from: account[0]});
  console.log(res)
  res =await execution_manager.methods.addStrategy(private_strategy).send({from: account[0]});
  console.log(res)
}
run();
