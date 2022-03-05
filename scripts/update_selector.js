const selector_addr = "0x92aa50a281a4A9AD6A5913E497c472410Bfa8a9E";
const helix_exchange_addr = "0x5F14f67a86022781db3Ac086E37a705C0e3e6C74";

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
