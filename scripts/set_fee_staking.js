//admin wallet and private sale
const users = ["0x5336e3EfB415aC86FA0A8182DB674f121945b85E","0x9b8e671580649BaD470f63064EE9505632948f4D"];
const shares = [20,30]
const fee_sharing_setter = "0xF0290e71657211E91aDB3Bad8eeE9EC9754B9643";
require("dotenv").config({ path: ".env" });

const jsonfile = require("jsonfile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER);
const Web3 = require("web3");
const web3 = new Web3(provider);

const FeeSharingSetter = jsonfile.readFileSync(
  "build/contracts/FeeSharingSetter.json"
).abi;

async function run() {
  const account = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(FeeSharingSetter, fee_sharing_setter);
//   const res = await contract.methods
//   .percentForFeeStaking()
//   .call();
// console.log(res);
// const res = await contract.methods
//     .viewFeeStakingAddresses()
//     .call({ from: account[0] });
//   const res = await contract.methods
//     .updateFeeStakingAddresses(users, shares)
//     .send({ from: account[0] });
//   console.log(res);

  const res = await contract.methods
    .updateRewards()
    .send({ from: account[0] });
  console.log(res);
}
run();
