const CurrencyManager = artifacts.require("CurrencyManager")
const FarmToken = artifacts.require("FarmToken")


const weth_addr = process.env.WETH
const execution_manager_addr = "0x2Aacdd8AE6cD7FC60F39cEBce2c09B8Bf57e5Acd"

module.exports = async function () {
  const currency_manager = await CurrencyManager.at(execution_manager_addr)
  
}