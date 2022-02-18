const jsonfile = require("jsonfile");
const ethUtil = require("ethereumjs-util");

const HelixmetaAirdrop = jsonfile.readFileSync(
  "build/contracts/HelixmetaAirdrop.json"
).abi;
const IERC721 = jsonfile.readFileSync("build/contracts/IERC721.json").abi;

const airdrop_address = "0xB736441e117A2Fb9B8A46F9f38141D63222B9Fe8";
const standard_strategy = "0x5aAA091990edc6657a20605974a6FE9048F7F342";
const transfererc721_manager_addr =
  "0x4e0D0E0e74b35bb64783F75Eba1D74b3C2034BFD";
const WETH = process.env.WETH;

//const for all deployment
const MAKER_ORDER_HASH =
  "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028";

const prefix_domain =
  "0x190147d063a2b0975ac851bcfce5ad21b3feae3dfc7e0669f6f36a47619ac99ef71c";
const erc721_address = "0x9ba7183c5b136a3e881f52ec4a8343fa1761c862";
const SK_acc1 =
  "c31846bff0b9e65a3de758d77483ea0998ecd0c7b74b631e640e0f639c326b38";
  const SK_acc2 =
  "0b5e511021bdf3c0d97c12e17865b176d162e23689cd8312afc609e2dc2679e3";

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
    "0x256628a73776058Da1673dFC0315039e40DD30Eb",
    "0x1bb21FE614cA37A5FA13c2BAAb42465C2E574a46",
    "0xf3e75D0643CAD65B50F54EDa4253F7206692536e",
  ];
  const amount = ["1000000000000000", "2430000000000000", "10000000000000"];

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
          from: accounts[1],
        });
      console.log(result);
    });

  it("should claim with correct amount airdrop root", async function () {
    const accounts = await web3.eth.getAccounts();

    var makerAsk = {
      isOrderAsk: true,
      signer: accounts[2], // signer of the maker order
      collection: erc721_address, // collection address
      price: "2430000000000000", // price (used as )
      tokenId: 100, // id of the token
      amount: 1, // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
      strategy: standard_strategy, // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
      currency: WETH, // currency (e.g., WETH)
      nonce: 1, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
      startTime: Math.floor(Date.now() / 1000) - 2000, // startTime in timestamp
      endTime: Math.floor(Date.now() / 1000) + 5000, // endTime in timestamp
      minPercentageToAsk: 7000, // slippage protection (9000 --> 90% of the final price must return to ask)
      params: "0x12", // additional parameters
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
        from: accounts[2],
      });

    //  load airdrop contract
    const airdrop_instance = new web3.eth.Contract(
      HelixmetaAirdrop,
      airdrop_address
    );

    const result = await airdrop_instance.methods
      .claim(
        amount[1],
        [hash_acc_amount[0], hash_acc_amount[2]],
        makerAsk,
        true
      )
      .send({
        from: accounts[2],
      });
    // console.log(result);
  });
});
