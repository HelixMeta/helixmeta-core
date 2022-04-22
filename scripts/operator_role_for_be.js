const fee_sharing_setter = "0xf8aD1F77Fd06E398EE434F54Cd70d2841784aA9d";
const private_sale = "0xFD7B7e31d0f930bF07e505736229b57D94cbE53d" 
const wallet_admin = "0xf3e75D0643CAD65B50F54EDa4253F7206692536e"
const operator = "0xf3e75D0643CAD65B50F54EDa4253F7206692536e";
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

  var res = await contract.methods
    .grantRole(
      "0x97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929",
      operator
    )
    .send({ from: account[0] });
  console.log(res);

   res = await contract.methods
    .updateFeeStakingAddresses(
      [private_sale,wallet_admin],
      [20,30]
    )
    .send({ from: account[0] });
  console.log(res);
}
run();
