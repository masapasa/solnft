'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AuctionHouseBuildersClient = require('./AuctionHouseBuildersClient.cjs');
var createBid = require('./operations/createBid.cjs');
var cancelBid = require('./operations/cancelBid.cjs');
var cancelListing = require('./operations/cancelListing.cjs');
var createAuctionHouse = require('./operations/createAuctionHouse.cjs');
var depositToBuyerAccount = require('./operations/depositToBuyerAccount.cjs');
var executeSale = require('./operations/executeSale.cjs');
var findAuctionHouseByAddress = require('./operations/findAuctionHouseByAddress.cjs');
var findAuctionHouseByCreatorAndMint = require('./operations/findAuctionHouseByCreatorAndMint.cjs');
var findBidByReceipt = require('./operations/findBidByReceipt.cjs');
var findBidByTradeState = require('./operations/findBidByTradeState.cjs');
var findBidsByPublicKeyField = require('./operations/findBidsByPublicKeyField.cjs');
var findListingByTradeState = require('./operations/findListingByTradeState.cjs');
var findListingByReceipt = require('./operations/findListingByReceipt.cjs');
var findListingsByPublicKeyField = require('./operations/findListingsByPublicKeyField.cjs');
var findPurchaseByTradeState = require('./operations/findPurchaseByTradeState.cjs');
var findPurchaseByReceipt = require('./operations/findPurchaseByReceipt.cjs');
var findPurchasesByPublicKeyField = require('./operations/findPurchasesByPublicKeyField.cjs');
var getBuyerBalance = require('./operations/getBuyerBalance.cjs');
var createListing = require('./operations/createListing.cjs');
var loadBid = require('./operations/loadBid.cjs');
var loadListing = require('./operations/loadListing.cjs');
var loadPurchase = require('./operations/loadPurchase.cjs');
var updateAuctionHouse = require('./operations/updateAuctionHouse.cjs');
var withdrawFromBuyerAccount = require('./operations/withdrawFromBuyerAccount.cjs');
var withdrawFromFeeAccount = require('./operations/withdrawFromFeeAccount.cjs');
var withdrawFromTreasuryAccount = require('./operations/withdrawFromTreasuryAccount.cjs');

/**
 * This is a client for the Auction House module.
 *
 * It enables us to interact with the Auction House program in order to
 * create and update Auction House to configure a marketplace as well to allow
 * users to list, bid and execute sales.
 *
 * You may access this client via the `auctionHouse()` method of your `Metaplex` instance.
 *
 * ```ts
 * const auctionHouseClient = metaplex.auctionHouse();
 * ```
 *
 * @example
 * You can create a new Auction House with minimum input like so.
 * By default, the current identity of the Metaplex instance will be
 * the authority of the Auction House.
 *
 * ```ts
 * const { auctionHouse } = await metaplex
 *   .auctionHouse()
 *   .create({
 *     sellerFeeBasisPoints: 500, // 5% royalties
 *   })
 *   .run();
 * ```
 *
 * @see {@link AuctionHouse} The `AuctionHouse` model
 * @group Modules
 */

class AuctionHouseClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /**
   * You may use the `builders()` client to access the
   * underlying Transaction Builders of this module.
   *
   * ```ts
   * const buildersClient = metaplex.auctions().builders();
   * ```
   */


  builders() {
    return new AuctionHouseBuildersClient.AuctionHouseBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createBidOperation} */


  bid(input) {
    return this.metaplex.operations().getTask(createBid.createBidOperation(input));
  }
  /** {@inheritDoc cancelBidOperation} */


  cancelBid(input) {
    return this.metaplex.operations().getTask(cancelBid.cancelBidOperation(input));
  }
  /** {@inheritDoc cancelListingOperation} */


  cancelListing(input) {
    return this.metaplex.operations().getTask(cancelListing.cancelListingOperation(input));
  }
  /** {@inheritDoc createAuctionHouseOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createAuctionHouse.createAuctionHouseOperation(input));
  }
  /** {@inheritDoc depositToBuyerAccountOperation} */


  depositToBuyerAccount(input) {
    return this.metaplex.operations().getTask(depositToBuyerAccount.depositToBuyerAccountOperation(input));
  }
  /** {@inheritDoc executeSaleOperation} */


  executeSale(input) {
    return this.metaplex.operations().getTask(executeSale.executeSaleOperation(input));
  }
  /** {@inheritDoc findAuctionHouseByAddressOperation} */


  findByAddress(options) {
    return this.metaplex.operations().getTask(findAuctionHouseByAddress.findAuctionHouseByAddressOperation(options));
  }
  /** {@inheritDoc findAuctionHouseByCreatorAndMintOperation} */


  findByCreatorAndMint(options) {
    return this.metaplex.operations().getTask(findAuctionHouseByCreatorAndMint.findAuctionHouseByCreatorAndMintOperation(options));
  }
  /** {@inheritDoc findBidByReceiptOperation} */


  findBidByReceipt(options) {
    return this.metaplex.operations().getTask(findBidByReceipt.findBidByReceiptOperation(options));
  }
  /** {@inheritDoc findBidByTradeStateOperation} */


  findBidByTradeState(options) {
    return this.metaplex.operations().getTask(findBidByTradeState.findBidByTradeStateOperation(options));
  }
  /** {@inheritDoc findBidsByPublicKeyFieldOperation} */


  findBidsBy(input) {
    return this.metaplex.operations().getTask(findBidsByPublicKeyField.findBidsByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findListingByTradeStateOperation} */


  findListingByTradeState(options) {
    return this.metaplex.operations().getTask(findListingByTradeState.findListingByTradeStateOperation(options));
  }
  /** {@inheritDoc findListingByReceiptOperation} */


  findListingByReceipt(options) {
    return this.metaplex.operations().getTask(findListingByReceipt.findListingByReceiptOperation(options));
  }
  /** {@inheritDoc findListingsByPublicKeyFieldOperation} */


  findListingsBy(input) {
    return this.metaplex.operations().getTask(findListingsByPublicKeyField.findListingsByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findPurchaseByTradeStateOperation} */


  findPurchaseByTradeState(options) {
    return this.metaplex.operations().getTask(findPurchaseByTradeState.findPurchaseByTradeStateOperation(options));
  }
  /** {@inheritDoc findPurchaseByReceiptOperation} */


  findPurchaseByReceipt(options) {
    return this.metaplex.operations().getTask(findPurchaseByReceipt.findPurchaseByReceiptOperation(options));
  }
  /** {@inheritDoc findPurchasesByPublicKeyFieldOperation} */


  findPurchasesBy(input) {
    return this.metaplex.operations().getTask(findPurchasesByPublicKeyField.findPurchasesByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc getBuyerBalanceOperation} */


  getBuyerBalance(options) {
    return this.metaplex.operations().getTask(getBuyerBalance.getBuyerBalanceOperation(options));
  }
  /** {@inheritDoc createListingOperation} */


  list(input) {
    return this.metaplex.operations().getTask(createListing.createListingOperation(input));
  }
  /** {@inheritDoc loadBidOperation} */


  loadBid(options) {
    return this.metaplex.operations().getTask(loadBid.loadBidOperation(options));
  }
  /** {@inheritDoc loadListingOperation} */


  loadListing(options) {
    return this.metaplex.operations().getTask(loadListing.loadListingOperation(options));
  }
  /** {@inheritDoc loadPurchaseOperation} */


  loadPurchase(options) {
    return this.metaplex.operations().getTask(loadPurchase.loadPurchaseOperation(options));
  }
  /** {@inheritDoc updateAuctionHouseOperation} */


  update(options) {
    return this.metaplex.operations().getTask(updateAuctionHouse.updateAuctionHouseOperation(options));
  }
  /** {@inheritDoc withdrawFromBuyerAccountOperation} */


  withdrawFromBuyerAccount(input) {
    return this.metaplex.operations().getTask(withdrawFromBuyerAccount.withdrawFromBuyerAccountOperation(input));
  }
  /** {@inheritDoc withdrawFromFeeAccountOperation} */


  withdrawFromFeeAccount(input) {
    return this.metaplex.operations().getTask(withdrawFromFeeAccount.withdrawFromFeeAccountOperation(input));
  }
  /** {@inheritDoc withdrawFromTreasuryAccountOperation} */


  withdrawFromTreasuryAccount(input) {
    return this.metaplex.operations().getTask(withdrawFromTreasuryAccount.withdrawFromTreasuryAccountOperation(input));
  }

}

exports.AuctionHouseClient = AuctionHouseClient;
//# sourceMappingURL=AuctionHouseClient.cjs.map
