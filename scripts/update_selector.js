const selector_addr = "0x16a92F82FC2A8326472dD723db18d7564F53537B";
const helix_exchange_addr = "0x8072711992532D34cD2fed82FE24A21539502D1C";

require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const HelixmetaExchange = jsonfile.readFileSync(
  "build/contracts/HelixmetaExchange.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts();
  const helix_exchange = new web3.eth.Contract(
    HelixmetaExchange,
    helix_exchange_addr
  );

  const res = await helix_exchange.methods
    .updateTransferSelectorNFT(selector_addr)
    .send({ from: account[0] });
    console.log(res)
}
run();
