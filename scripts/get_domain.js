const helix_exchange_addr = "0xb8f763185c1BE193B2836E96a1f255A2B0146D17";
const jsonfile = require("jsonfile");
require("dotenv").config({ path: ".env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider =  new HDWalletProvider(process.env.MNEMONIC,process.env.PROVIDER)
const Web3 = require("web3");
const web3 = new Web3(provider);

const HelixmetaExchange = jsonfile.readFileSync(
  "build/contracts/HelixmetaExchange.json"
).abi;

async function get_domain() {
  const helix_exchange = new web3.eth.Contract(HelixmetaExchange, helix_exchange_addr);
  const domain = await helix_exchange.methods.DOMAIN_SEPARATOR().call();
  console.log(domain)
};
get_domain()
