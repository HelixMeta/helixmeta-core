require("dotenv").config({ path: ".env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

var privateKeys = process.env.MNEMONIC.split(' ')

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://mainnet.infura.io/v3/` + process.env.INFURA_KEY
        ),
      network_id: 1,
      gas: 10000000,
      gasPrice: 101000000000,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          privateKeys,
          `https://rinkeby.infura.io/v3/` + process.env.INFURA_KEY,
          0,
          2
        ),
      network_id: 4,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          privateKeys,
          `https://matic-mumbai.chainstacklabs.com`
        ),

      network_id: 80001,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          privateKeys,
          `https://ropsten.infura.io/v3/` + process.env.INFURA_KEY,
          0,
          2
        ),
      network_id: 3,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  plugins: ["truffle-plugin-verify"],

  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY,
  },
};
