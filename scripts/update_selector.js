const selector_addr = "0x35534EAB975E1e4f7164b2807f9139bE81313668";
const helix_exchange_addr = "0xb8f763185c1BE193B2836E96a1f255A2B0146D17";

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
