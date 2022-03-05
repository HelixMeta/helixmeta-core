const EthDater = require("ethereum-block-by-date");
const Web3 = require("web3");
require("dotenv").config({ path: ".env" });

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));

const dater = new EthDater(
  web3 // Web3 object, required.
);
async function get_block() {
  let block = await dater.getDate(
    "5 Mar 2022 00:00:00 GMT", // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
    true // Block after, optional. Search for the nearest block before or after the given date. By default true.
  );

  // console.log(block)
  console.log("block number:", block.block);

  let timestamp = new Date('15 Mar 2022 00:00:00 GMT').getTime()
  console.log("timestamp:", Math.floor(timestamp/1000));
}
get_block();
