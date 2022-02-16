const jsonfile = require("jsonfile");
const ethUtil = require("ethereumjs-util");

const HelixmetaExchange = jsonfile.readFileSync(
  "build/contracts/HelixmetaExchange.json"
).abi;
const IERC721 = jsonfile.readFileSync("build/contracts/IERC721.json").abi;
const IERC1155 = jsonfile.readFileSync("build/contracts/IERC1155.json").abi;
const IWETH = jsonfile.readFileSync("build/contracts/IWETH.json").abi;
const IHelixmetaToken = jsonfile.readFileSync(
  "build/contracts/IHelixmetaToken.json"
).abi;

//const for all deployment
const MAKER_ORDER_HASH =
  "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028";

//replace for new deployment
const transfererc721_manager_addr =
  "0x4e0D0E0e74b35bb64783F75Eba1D74b3C2034BFD";
const transfererc1155_manager_addr =
  "0x6cc9A96AAB3e82Cd64cA6b3DAA8303049F444F98";
const helixmeta_exchange_address = "0xf69746e7f5636d13426f41E38d6445767f682F4C";
const helixmeta_token_address = "0x9BAf798DF6786E05A29C496d37756F1F81fCF008";
const erc721_address = "0x9ba7183c5b136a3e881f52ec4a8343fa1761c862";
const erc1155_address = "0x73fe1280bd329e542ebd34af1620026fe4c6d080";
const prefix_domain =
  "0x190147d063a2b0975ac851bcfce5ad21b3feae3dfc7e0669f6f36a47619ac99ef71c";
const WETH = process.env.WETH;
const standard_strategy = "0x5aAA091990edc6657a20605974a6FE9048F7F342";

//replace for each test (increate 1 for token, 3 for nonce)
const token_id_erc = 12;
const nonce = 11;

const SK_acc0 =
  "d278b1141f204160fcbed9ea0b3c33b74a4f0a2207ec4482b77ffabde8c0c35a";
const SK_acc1 =
  "c31846bff0b9e65a3de758d77483ea0998ecd0c7b74b631e640e0f639c326b38";

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

contract("exchange for users", function () {
  it("should match ask with taker bid using ETH and WETH", async function () {
    const accounts = await web3.eth.getAccounts();

    //  Account taker bid approve weth for helixmeta exchange
    // load weth contract
    const weth = new web3.eth.Contract(IWETH, process.env.WETH);
    await weth.methods
      .approve(helixmeta_exchange_address, "1000000000000000")
      .send({
        from: accounts[1],
      });

    //  Account ask approve erc721 for transfer manager
    // load erc721 contract
    const ERC721 = new web3.eth.Contract(IERC721, erc721_address);
    await ERC721.methods
      .approve(transfererc721_manager_addr, token_id_erc)
      .send({
        from: accounts[0],
      });

    var takerBid = {
      isOrderAsk: false,
      taker: accounts[1],
      price: "1000000000000000",
      tokenId: token_id_erc,
      minPercentageToAsk: 7000,
      params:
        "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9",
    };

    var makerAsk = {
      isOrderAsk: true,
      signer: accounts[0], // signer of the maker order
      collection: erc721_address, // collection address
      price: "1000000000000000", // price (used as )
      tokenId: token_id_erc, // id of the token
      amount: 1, // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
      strategy: standard_strategy, // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
      currency: WETH, // currency (e.g., WETH)
      nonce: nonce, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
      startTime: Math.floor(Date.now() / 1000) - 2000, // startTime in timestamp
      endTime: Math.floor(Date.now() / 1000) + 5000, // endTime in timestamp
      minPercentageToAsk: 7000, // slippage protection (9000 --> 90% of the final price must return to ask)
      params:
        "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9", // additional parameters
      v: "", // v: parameter (27 or 28)
      r: "", // r: parameter
      s: "", // s: parameter
    };

    const hash_data = hash_(makerAsk);
    const sign_data = sign_hash(hash_data, SK_acc0);
    // console.log(sign_data);
    makerAsk.v = sign_data.v;
    makerAsk.r = sign_data.r;
    makerAsk.s = sign_data.s;

    //  load exchange contract
    const helixmetaExchange = new web3.eth.Contract(
      HelixmetaExchange,
      helixmeta_exchange_address
    );

    const result = await helixmetaExchange.methods
      .matchAskWithTakerBidUsingETHAndWETH(takerBid, makerAsk)
      .send({
        from: accounts[1],
      });
    // console.log(result);
  });

  it("should match ask with taker bid using helixmeta", async function () {
    const accounts = await web3.eth.getAccounts();

    // load hlmtoken contract
    const hlmToken = new web3.eth.Contract(
      IHelixmetaToken,
      helixmeta_token_address
    );
    await hlmToken.methods
      .approve(helixmeta_exchange_address, "1000000000000000")
      .send({
        from: accounts[0],
      });

    // load erc1155 contract
    const ERC1155 = new web3.eth.Contract(IERC1155, erc1155_address);
    await ERC1155.methods
      .setApprovalForAll(transfererc1155_manager_addr, true)
      .send({
        from: accounts[1],
      });

    var takerBid = {
      isOrderAsk: false,
      taker: accounts[0],
      price: "1000000000000000",
      tokenId: token_id_erc,
      minPercentageToAsk: 7000,
      params:
        "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9",
    };

    var makerAsk = {
      isOrderAsk: true,
      signer: accounts[1], // signer of the maker order
      collection: erc1155_address, // collection address
      price: "1000000000000000", // price (used as )
      tokenId: token_id_erc, // id of the token
      amount: 2, // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
      strategy: standard_strategy, // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
      currency: helixmeta_token_address, // currency (e.g., WETH)
      nonce: nonce, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
      startTime: Math.floor(Date.now() / 1000) - 2000, // startTime in timestamp
      endTime: Math.floor(Date.now() / 1000) + 5000, // endTime in timestamp
      minPercentageToAsk: 7000, // slippage protection (9000 --> 90% of the final price must return to ask)
      params:
        "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9", // additional parameters
      v: "", // v: parameter (27 or 28)
      r: "", // r: parameter
      s: "", // s: parameter
    };

    const hash_data = hash_(makerAsk);
    const sign_data = sign_hash(hash_data, SK_acc1);
    // console.log(sign_data);
    makerAsk.v = sign_data.v;
    makerAsk.r = sign_data.r;
    makerAsk.s = sign_data.s;

    //  load exchange contract
    const helixmetaExchange = new web3.eth.Contract(
      HelixmetaExchange,
      helixmeta_exchange_address
    );

    const result = await helixmetaExchange.methods
      .matchAskWithTakerBid(takerBid, makerAsk)
      .send({
        from: accounts[0],
      });
    // console.log(result);
  });

  it("should match bid with taker ask using helixmeta or weth", async function () {
    const accounts = await web3.eth.getAccounts();

    // load hlmtoken contract
    const hlmToken = new web3.eth.Contract(
      IHelixmetaToken,
      helixmeta_token_address
    );
    await hlmToken.methods
      .approve(helixmeta_exchange_address, "1000000000000000")
      .send({
        from: accounts[0],
      });

    // load erc721 contract
    const ERC721 = new web3.eth.Contract(IERC721, erc721_address);
    await ERC721.methods
      .approve(transfererc721_manager_addr, token_id_erc)
      .send({
        from: accounts[1],
      });

    var takerAsk = {
      isOrderAsk: true,
      taker: accounts[1],
      price: "1000000000000000",
      tokenId: token_id_erc,
      minPercentageToAsk: 7000,
      params:
        "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9",
    };

    var makerBid = {
      isOrderAsk: false,
      signer: accounts[0], // signer of the maker order
      collection: erc721_address, // collection address
      price: "1000000000000000", // price (used as )
      tokenId: token_id_erc, // id of the token
      amount: 1, // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
      strategy: standard_strategy, // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
      currency: helixmeta_token_address, // currency (e.g., WETH)
      nonce: nonce + 1, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
      startTime: Math.floor(Date.now() / 1000) - 2000, // startTime in timestamp
      endTime: Math.floor(Date.now() / 1000) + 5000, // endTime in timestamp
      minPercentageToAsk: 7000, // slippage protection (9000 --> 90% of the final price must return to ask)
      params:
        "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9", // additional parameters
      v: "", // v: parameter (27 or 28)
      r: "", // r: parameter
      s: "", // s: parameter
    };

    const hash_data = hash_(makerBid);
    const sign_data = sign_hash(hash_data, SK_acc0);
    // console.log(sign_data);
    makerBid.v = sign_data.v;
    makerBid.r = sign_data.r;
    makerBid.s = sign_data.s;

    //  load exchange contract
    const helixmetaExchange = new web3.eth.Contract(
      HelixmetaExchange,
      helixmeta_exchange_address
    );

    const result = await helixmetaExchange.methods
      .matchBidWithTakerAsk(takerAsk, makerBid)
      .send({
        from: accounts[1],
      });
    // console.log(result);
  });

  it("should cancel all orders for sender", async function () {
    const accounts = await web3.eth.getAccounts();

     //  load exchange contract
     const helixmetaExchange = new web3.eth.Contract(
      HelixmetaExchange,
      helixmeta_exchange_address
    );

    const result = await helixmetaExchange.methods
      .cancelAllOrdersForSender(nonce + 2)
      .send({
        from: accounts[0],
      });
    // console.log(result);
  })

  it("should cancel multiple maker order", async function () {
    const accounts = await web3.eth.getAccounts();

     //  load exchange contract
     const helixmetaExchange = new web3.eth.Contract(
      HelixmetaExchange,
      helixmeta_exchange_address
    );

    const result = await helixmetaExchange.methods
      .cancelMultipleMakerOrders([nonce+1, nonce+2])
      .send({
        from: accounts[1],
      });
    // console.log(result);
  })
});


