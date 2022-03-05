const execution_manager_addr = "0xb123489489aCFf2034db67b36e9df74414E4c287";
const stardard_strategy = "0x8CB061E662845fe18286b57c9e73e4b0647A38c3"
const collection_strategy = "0xF2F44670803e6ecd7455B3cF8c009AeA701c9c79"
const private_strategy = "0xF0706fBc664D420F3012a543525291e1d8545432"

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
