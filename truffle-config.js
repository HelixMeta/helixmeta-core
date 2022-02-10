require("dotenv").config({ path: ".env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

var privateKeys = ["c31846bff0b9e65a3de758d77483ea0998ecd0c7b74b631e640e0f639c326b38","d278b1141f204160fcbed9ea0b3c33b74a4f0a2207ec4482b77ffabde8c0c35a"]

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
          `https://rinkeby.infura.io/v3/` + process.env.INFURA_KEY, 0, 2
        ),
      network_id: 4,
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
