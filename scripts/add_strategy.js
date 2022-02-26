const execution_manager_addr = "0x40b0f8BEB0B29527d553F0AAdd5A6997fD641657";
const stardard_strategy = "0x779aEFBccA59d39F8751743f0194250984FbA8D7"
const collection_strategy = "0xe5A070493a828742da2D01Ea5CCa1509c6aE2B4F"
const private_strategy = "0xE570a6b05eC5eE32ca2B0ed0308bb272BFc774B8"

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
  await execution_manager.methods.addStrategy(stardard_strategy).send({from: account[0]});
  await execution_manager.methods.addStrategy(collection_strategy).send({from: account[0]});
  await execution_manager.methods.addStrategy(private_strategy).send({from: account[0]});
}
run();
