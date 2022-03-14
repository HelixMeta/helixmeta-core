const execution_manager_addr = "0xf5c1c518AE1D38Bd73bE36D65a8376F472849A15";
const stardard_strategy = "0xCC0af8988BA6322946c83AEcbc60E4D2F41e62AE"
const collection_strategy = "0x729285328d5B6BDd3698fc090bff53d5B56658b7"
const private_strategy = "0xE786d8a20216c30F72F8125430281F6B29A79786"

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
