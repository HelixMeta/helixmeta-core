const jsonfile = require("jsonfile");
const ethUtil = require("ethereumjs-util");

const HelixmetaAirdrop = jsonfile.readFileSync(
  "build/contracts/HelixmetaAirdrop.json"
).abi;
const IERC721 = jsonfile.readFileSync("build/contracts/IERC721.json").abi;

const airdrop_address = "0xFF2633FC7c34016fa244a1BC95eDb778d8A0C3DF";
const standard_strategy = "0x779aEFBccA59d39F8751743f0194250984FbA8D7";
const transfererc721_manager_addr =
  "0x168a4DBB27130ABcE0138f2bAA7Cfe9bC4d8C9Ee";
const WETH = process.env.WETH;

//const for all deployment
const MAKER_ORDER_HASH =
  "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028";

const prefix_domain =
  "0x19016702607968745078cfae9cbd40044ddda65b198acd1f9c98d64205c2de7106d2";
const erc721_address = "0x9ba7183c5b136a3e881f52ec4a8343fa1761c862";
const SK_acc1 =
  "c31846bff0b9e65a3de758d77483ea0998ecd0c7b74b631e640e0f639c326b38";
const SK_acc2 =
  "c9167063efd34f761ac7acacaa41279cca82dd01f0abbdf69eb9cf2b544ba915";

function hash_(makerOrder) {
  const encode =
    MAKER_ORDER_HASH +
    Number(makerOrder.isOrderAsk).toString().padStart(64, "0") +
    makerOrder.signer.toLowerCase().slice(2).padStart(64, "0") +
    makerOrder.collection.toLowerCase().slice(2).padStart(64, "0") +
    BigInt(makerOrder.price.toString()).toString(16).padStart(64, "0") +
    BigInt(makerOrder.tokenId.toString()).toString(16).padStart(64, "0") +
    BigInt(makerOrder.amount.toString()).toString(16).padStart(64, "0") +
    makerOrder.strategy.toLowerCase().slice(2).padStart(64, "0") +
    makerOrder.currency.toLowerCase().slice(2).padStart(64, "0") +
    BigInt(makerOrder.nonce.toString()).toString(16).padStart(64, "0") +
    BigInt(makerOrder.startTime.toString()).toString(16).padStart(64, "0") +
    BigInt(makerOrder.endTime.toString()).toString(16).padStart(64, "0") +
    BigInt(makerOrder.minPercentageToAsk.toString())
      .toString(16)
      .padStart(64, "0") +
    web3.utils.sha3(makerOrder.params).slice(2);

  // console.log("encode: ", encode);
  const maker_order_hash = web3.utils.sha3(encode);
  // console.log("make_order_hash", maker_order_hash);
  const prefix_hash = web3.utils.sha3(
    prefix_domain + maker_order_hash.slice(2)
  );
  // console.log("prefix_domain", prefix_domain);
  return prefix_hash.slice(2);
}

function sign_hash(inputHash, pkeyConfig) {
  var signature = { v: "", r: "", s: "" };
  // console.log(inputHash)
  const signature_getting = ethUtil.ecsign(
    Buffer.from(inputHash, "hex"),
    Buffer.from(pkeyConfig, "hex")
  );
  (signature.r = ethUtil.bufferToHex(signature_getting.r)),
    (signature.s = ethUtil.bufferToHex(signature_getting.s)),
    (signature.v = ethUtil.bufferToHex(signature_getting.v));
  // console.log(signature);
  return signature;
}

function hash_acc_and_amount(acc_addr, amount) {
  return web3.utils.sha3(
    "0x" +
      acc_addr.toLowerCase().slice(2) +
      BigInt(amount.toString()).toString(16).padStart(64, "0")
  );
}

function hash_hash(hash1, hash2) {
  if (hash1 >= hash2) return web3.utils.sha3(hash2 + hash1.slice(2));
  else return web3.utils.sha3(hash1 + hash2.slice(2));
}

contract("airdrop", function () {
  const acc = [
    "0xa86D2C1Ae522B19C70c3E9B50cfcB2F9fcA38725",
    "0x328d9Db669b4B0EF668dEc64aE4B78Fa715B5A31",
    "0x1433a85958b34086786BE0C32Cc7c943fc0C06D1",
    "0x48bFC200643366C3CbFEE64E7f1C7abBcc7D3Ec6",
    "0x882D4b497Fb7Bf077109835812688509eC8EFBa7",
    "0x0d05Bb3393B6fC07B944D0d955E96a9Ba90b1BED",
    "0x97e16AB950322C4C53B1779547FeA1f95D042238",
    "0xa7dd02a56d871949cB0655c69687Fe4944C995d9",
    "0xbb1E01797e0fD6599b401b5039a3a0CeadE21856",
    "0xAfeF0654eB1e890B30c2b4fd44131Ff09E2B4149",
    "0x02f7125B1e3A69d70479AB9E1107F851C71E83f2",
    "0x079e817473464123858f9a01C5bfF8A30e5D6E9E",
    "0x27ba952678e7a6AaDD8e31589d69Eb55cdC09401",
    "0x03ADA9606aD7e7441aa6724B0DD97Bc34De9Ed72",
    "0xF54b3294616d39749732Ac74F234F46C9ABf29C4",
    "0xaa9Ed1ed7a0AfC127Bf5eD8018f1CF53e57c2116",
    "0xf3e75D0643CAD65B50F54EDa4253F7206692536e",
    "0x256628a73776058Da1673dFC0315039e40DD30Eb",
    "0x72a812dAbF0337a21B92E02675244F46Bae159F7",
    "0x5f05c92f50FFA45dC6fEB94e9824d2677e49f838",
    "0x1bb21FE614cA37A5FA13c2BAAb42465C2E574a46",
    "0x97B9bba51C243744cbaC79A8cD40a5B6B0175fe3",
    "0xC8b2E6791c6e73755226DD95c459AA5689578c00",
  ];
  const amount = [
    "1000000000000000000",
    "2430000000000000000",
    "10000000000000",
    "1000000000000000",
    "10000000000000000",
    "100000000000000000",
    "10000000000000000",
    "10000000000000000",
    "100000000000000000",
    "100000000000000000",
    "10000000000000000",
    "10000000000000",
    "10000000000000",
    "10000000000000000",
    "10000000000000",
    "10000000000000",
    "10000000000000",
    "10000000000000",
    "10000000000000000000",
    "10000000000000000000",
    "10000000000000000000",
    "10000000000000000000",
    "10000000000000000000",
  ];

  var hash_acc_amount = [];

  for (var i = 0; i < acc.length; i++) {
    hash_acc_amount[i] = hash_acc_and_amount(acc[i], amount[i]);
    console.log(hash_acc_amount[i]);
  }
  var root = hash_acc_amount[0];
  for (var i = 1; i < acc.length; i++) {
    root = hash_hash(root, hash_acc_amount[i]);
  }

  it("should update airdrop root", async function () {
    const accounts = await web3.eth.getAccounts();

    //  load exchange contract
    const airdrop_instance = new web3.eth.Contract(
      HelixmetaAirdrop,
      airdrop_address
    );

    const result = await airdrop_instance.methods
      .setMerkleRoot(root)
      .send({
        from: accounts[0],
      });
    
  });

  it("should claim with correct amount airdrop root", async function () {
    const accounts = await web3.eth.getAccounts();

    var makerAsk = {
      isOrderAsk: true,
      signer: accounts[0], // signer of the maker order
      collection: erc721_address, // collection address
      price: "500000000000000000", // price (used as )
      tokenId: 100, // id of the token
      amount: 1, // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
      strategy: standard_strategy, // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
      currency: WETH, // currency (e.g., WETH)
      nonce: 1, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
      startTime: Math.floor(Date.now() / 1000) - 2000, // startTime in timestamp
      endTime: Math.floor(Date.now() / 1000) + 5000, // endTime in timestamp
      minPercentageToAsk: 1000, // slippage protection (9000 --> 90% of the final price must return to ask)
      params: "0x4026", // additional parameters
      v: "", // v: parameter (27 or 28)
      r: "", // r: parameter
      s: "", // s: parameter
    };

    const hash_data = hash_(makerAsk);
    const sign_data = sign_hash(hash_data, SK_acc2);

    makerAsk.v = sign_data.v;
    makerAsk.r = sign_data.r;
    makerAsk.s = sign_data.s;

    //list for sale in helix
    const ERC721 = new web3.eth.Contract(IERC721, erc721_address);
    await ERC721.methods
      .setApprovalForAll(transfererc721_manager_addr, true)
      .send({
        from: accounts[0],
      });
    console.log(root);
    //  load airdrop contract
    var temp = hash_acc_amount[0];
    for (var i = 1; i <= 0; i++) {
      temp = hash_hash(temp, hash_acc_amount[i]);
    }
    console.log(temp);

    const airdrop_instance = new web3.eth.Contract(
      HelixmetaAirdrop,
      airdrop_address
    );

    hash_acc_amount.splice(0, 2);
    hash_acc_amount.splice(0, 0, temp);
    
  
    const result = await airdrop_instance.methods
      .claim("1000000000000000000", hash_acc_amount, makerAsk, true)
      .send({
        from: accounts[0],
      });
    // console.log(result);
  });
});
