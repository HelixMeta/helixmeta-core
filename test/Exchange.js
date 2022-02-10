const jsonfile = require("jsonfile");

const LooksRareExchange = jsonfile.readFileSync(
  "build/contracts/LooksRareExchange.json"
).abi;
const IERC721 = jsonfile.readFileSync("build/contracts/IERC721.json").abi;

const looksRareExchangeAddress = "0x21BA3C325951a2dF0b7a0995433C28b4C964dC4B";
const erc721Address = "0x9ba7183c5b136a3e881f52ec4a8343fa1761c862";
const MAKER_ORDER_HASH = 0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028;
const domainSeparator = "0x010630ef1735626d1c20c456cb92cddec65ab292107cc9b44f85970a53cbd6c5"

const SK_acc0 = "0xd278b1141f204160fcbed9ea0b3c33b74a4f0a2207ec4482b77ffabde8c0c35a"
const SK_acc1 = "0xc31846bff0b9e65a3de758d77483ea0998ecd0c7b74b631e640e0f639c326b38"

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
      .padStart(64, "0")+ web3.utils.sha3(makerOrder.params).slice(2);

  const maker_order_hash = web3.utils.sha3(encode, { encoding: "hex" });
  // const hash = web3.utils.sha3("0x1901"+ domainSeparator.slice(2) + maker_order_hash.slice(2));
  // console.log("this is hash :",hash)
  return maker_order_hash;
}

function sign_hash(inputHash, pkeyConfig) {
  console.log(inputHash);
  const res = web3.eth.accounts.sign(inputHash, pkeyConfig);
  console.log(res)
  return res;
}

contract("match ask with taker bid using ETH and WETH", function () {
  
  it("should approve NFT721 tokenID 1 by maker ask from acc0 to looksRareExchange", async function () {
    const accounts = await web3.eth.getAccounts();
    // // load exchange contract
    // const ERC721 = new web3.eth.Contract(IERC721, erc721Address);

    // await ERC721.methods.approve(looksRareExchangeAddress, 2).send({
    //   from: accounts[0],
    // })
    // console.log(result)

    
  });
  // it("")
  it("should taker bid using ETH",async function (){
    const accounts = await web3.eth.getAccounts();
    var takerBid = {
      isOrderAsk: false,
      taker: accounts[1],
      price: 1000000000000000,
      tokenId: 1,
      minPercentageToAsk: 9000,
      params: "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9" 
    };

    var makerAsk = {
      isOrderAsk: true,
      signer: accounts[0], // signer of the maker order
      collection: erc721Address, // collection address
      price: 1000000000000000, // price (used as )
      tokenId: 1, // id of the token
      amount: 1, // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
      strategy: "0xe4A1009BD1945812fc6f203b9196cd7C57299c18", // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice)
      currency: "0x89c24cc1cB5Ee3c6F1E786B52f754230bd20a7f9", // currency (e.g., WETH)
      nonce: 1, // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
      startTime: 1643881562078, // startTime in timestamp
      endTime: 1644251566785, // endTime in timestamp
      minPercentageToAsk: 9000, // slippage protection (9000 --> 90% of the final price must return to ask)
      params: "0x40261ade532fa1d2c7293df30aaadb9b3c616fae525a0b56d3d411c841a85028000000000000000000000000000000000000000000000000000000000000000100000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c300000000000000000000000049114597ef077b8ddfa8c2be2dd35a1fe5c586c30000000000000000000000000000000000000000000000000429d069189e000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e4a1009bd1945812fc6f203b9196cd7c57299c1800000000000000000000000089c24cc1cb5ee3c6f1e786b52f754230bd20a7f9", // additional parameters
      v: "", // v: parameter (27 or 28)
      r: "", // r: parameter
      s: "", // s: parameter
    };

    const hash_data = hash_(makerAsk)
    const sign_data = sign_hash(hash_data,SK_acc0)
    makerAsk.v = sign_data.v;
    makerAsk.r = sign_data.r;
    makerAsk.s = sign_data.s;

     // load exchange contract
     const looksRareExchange = new web3.eth.Contract(LooksRareExchange, looksRareExchangeAddress);

     const result = await looksRareExchange.methods.matchAskWithTakerBidUsingETHAndWETH(takerBid, makerAsk).send({
       from: accounts[1]
     })
     console.log(result)
  })
});
