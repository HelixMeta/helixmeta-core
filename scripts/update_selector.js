const selector_addr = "0x9c5C4533a359E76175ab22ffa9396991F036E49A";
const helix_exchange_addr = "0x7e536EdFD3766f7B7bcb241CC50f93a45E47f4Ab";

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
