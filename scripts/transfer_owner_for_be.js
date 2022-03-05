const trading_reward_distributor = "0x24BAf37B0A82ce69d26531cFD450a9745A7e1f61";
const helixmeta_exchange= "0x5F14f67a86022781db3Ac086E37a705C0e3e6C74"
const fee_sharing_system = "0x9Cf98aa9C0b0c51602c8FDCf37117a0b1F9a6698"
const airdrop = "0x4000bC590dE3c17E8Ff11732C2582A995AA16481"
const owner = "0xFcC568980C9fbE61e43bd5D1673B37dCF3d7f464"
require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const TradingRewardsDistributor = jsonfile.readFileSync(
  "build/contracts/TradingRewardsDistributor.json"
).abi;

const HelixmetaAirdrop = jsonfile.readFileSync(
  "build/contracts/HelixmetaAirdrop.json"
).abi;

const HelixmetaExchange = jsonfile.readFileSync(
  "build/contracts/HelixmetaExchange.json"
).abi;

const FeeSharingSystem = jsonfile.readFileSync(
  "build/contracts/FeeSharingSystem.json"
).abi;


async function run() {
  const account = await web3.eth.getAccounts()
  const contract_airdrop = new web3.eth.Contract(
    HelixmetaAirdrop,
    airdrop
  );

  const contract_exchange = new web3.eth.Contract(
    HelixmetaExchange,
    helixmeta_exchange
  );

  const contract_fee_sharing_system = new web3.eth.Contract(
    FeeSharingSystem,
    fee_sharing_system
  );

  const contract_trading_reward_distributor = new web3.eth.Contract(
    TradingRewardsDistributor,
    trading_reward_distributor
  );
  
  var res = await contract_airdrop.methods.transferOwnership(owner).send({from: account[0]});
  console.log(res)
  res = await contract_exchange.methods.transferOwnership(owner).send({from: account[0]});
  console.log(res)
  res = await contract_fee_sharing_system.methods.transferOwnership(owner).send({from: account[0]});
  console.log(res)
  res = await contract_trading_reward_distributor.methods.transferOwnership(owner).send({from: account[0]});
  console.log(res)
}
run();
