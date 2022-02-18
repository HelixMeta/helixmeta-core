const jsonfile = require("jsonfile");

const StakingPoolForUniswapV2Tokens = jsonfile.readFileSync(
    "build/contracts/StakingPoolForUniswapV2Tokens.json"
  ).abi;