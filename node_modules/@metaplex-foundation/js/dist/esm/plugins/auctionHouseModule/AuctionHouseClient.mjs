import { AuctionHouseBuildersClient } from './AuctionHouseBuildersClient.mjs';
import { createBidOperation } from './operations/createBid.mjs';
import { cancelBidOperation } from './operations/cancelBid.mjs';
import { cancelListingOperation } from './operations/cancelListing.mjs';
import { createAuctionHouseOperation } from './operations/createAuctionHouse.mjs';
import { depositToBuyerAccountOperation } from './operations/depositToBuyerAccount.mjs';
import { executeSaleOperation } from './operations/executeSale.mjs';
import { findAuctionHouseByAddressOperation } from './operations/findAuctionHouseByAddress.mjs';
import { findAuctionHouseByCreatorAndMintOperation } from './operations/findAuctionHouseByCreatorAndMint.mjs';
import { findBidByReceiptOperation } from './operations/findBidByReceipt.mjs';
import { findBidByTradeStateOperation } from './operations/findBidByTradeState.mjs';
import { findBidsByPublicKeyFieldOperation } from './operations/findBidsByPublicKeyField.mjs';
import { findListingByTradeStateOperation } from './operations/findListingByTradeState.mjs';
import { findListingByReceiptOperation } from './operations/findListingByReceipt.mjs';
import { findListingsByPublicKeyFieldOperation } from './operations/findListingsByPublicKeyField.mjs';
import { findPurchaseByTradeStateOperation } from './operations/findPurchaseByTradeState.mjs';
import { findPurchaseByReceiptOperation } from './operations/findPurchaseByReceipt.mjs';
import { findPurchasesByPublicKeyFieldOperation } from './operations/findPurchasesByPublicKeyField.mjs';
import { getBuyerBalanceOperation } from './operations/getBuyerBalance.mjs';
import { createListingOperation } from './operations/createListing.mjs';
import { loadBidOperation } from './operations/loadBid.mjs';
import { loadListingOperation } from './operations/loadListing.mjs';
import { loadPurchaseOperation } from './operations/loadPurchase.mjs';
import { updateAuctionHouseOperation } from './operations/updateAuctionHouse.mjs';
import { withdrawFromBuyerAccountOperation } from './operations/withdrawFromBuyerAccount.mjs';
import { withdrawFromFeeAccountOperation } from './operations/withdrawFromFeeAccount.mjs';
import { withdrawFromTreasuryAccountOperation } from './operations/withdrawFromTreasuryAccount.mjs';

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
    return new AuctionHouseBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createBidOperation} */


  bid(input) {
    return this.metaplex.operations().getTask(createBidOperation(input));
  }
  /** {@inheritDoc cancelBidOperation} */


  cancelBid(input) {
    return this.metaplex.operations().getTask(cancelBidOperation(input));
  }
  /** {@inheritDoc cancelListingOperation} */


  cancelListing(input) {
    return this.metaplex.operations().getTask(cancelListingOperation(input));
  }
  /** {@inheritDoc createAuctionHouseOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createAuctionHouseOperation(input));
  }
  /** {@inheritDoc depositToBuyerAccountOperation} */


  depositToBuyerAccount(input) {
    return this.metaplex.operations().getTask(depositToBuyerAccountOperation(input));
  }
  /** {@inheritDoc executeSaleOperation} */


  executeSale(input) {
    return this.metaplex.operations().getTask(executeSaleOperation(input));
  }
  /** {@inheritDoc findAuctionHouseByAddressOperation} */


  findByAddress(options) {
    return this.metaplex.operations().getTask(findAuctionHouseByAddressOperation(options));
  }
  /** {@inheritDoc findAuctionHouseByCreatorAndMintOperation} */


  findByCreatorAndMint(options) {
    return this.metaplex.operations().getTask(findAuctionHouseByCreatorAndMintOperation(options));
  }
  /** {@inheritDoc findBidByReceiptOperation} */


  findBidByReceipt(options) {
    return this.metaplex.operations().getTask(findBidByReceiptOperation(options));
  }
  /** {@inheritDoc findBidByTradeStateOperation} */


  findBidByTradeState(options) {
    return this.metaplex.operations().getTask(findBidByTradeStateOperation(options));
  }
  /** {@inheritDoc findBidsByPublicKeyFieldOperation} */


  findBidsBy(input) {
    return this.metaplex.operations().getTask(findBidsByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findListingByTradeStateOperation} */


  findListingByTradeState(options) {
    return this.metaplex.operations().getTask(findListingByTradeStateOperation(options));
  }
  /** {@inheritDoc findListingByReceiptOperation} */


  findListingByReceipt(options) {
    return this.metaplex.operations().getTask(findListingByReceiptOperation(options));
  }
  /** {@inheritDoc findListingsByPublicKeyFieldOperation} */


  findListingsBy(input) {
    return this.metaplex.operations().getTask(findListingsByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findPurchaseByTradeStateOperation} */


  findPurchaseByTradeState(options) {
    return this.metaplex.operations().getTask(findPurchaseByTradeStateOperation(options));
  }
  /** {@inheritDoc findPurchaseByReceiptOperation} */


  findPurchaseByReceipt(options) {
    return this.metaplex.operations().getTask(findPurchaseByReceiptOperation(options));
  }
  /** {@inheritDoc findPurchasesByPublicKeyFieldOperation} */


  findPurchasesBy(input) {
    return this.metaplex.operations().getTask(findPurchasesByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc getBuyerBalanceOperation} */


  getBuyerBalance(options) {
    return this.metaplex.operations().getTask(getBuyerBalanceOperation(options));
  }
  /** {@inheritDoc createListingOperation} */


  list(input) {
    return this.metaplex.operations().getTask(createListingOperation(input));
  }
  /** {@inheritDoc loadBidOperation} */


  loadBid(options) {
    return this.metaplex.operations().getTask(loadBidOperation(options));
  }
  /** {@inheritDoc loadListingOperation} */


  loadListing(options) {
    return this.metaplex.operations().getTask(loadListingOperation(options));
  }
  /** {@inheritDoc loadPurchaseOperation} */


  loadPurchase(options) {
    return this.metaplex.operations().getTask(loadPurchaseOperation(options));
  }
  /** {@inheritDoc updateAuctionHouseOperation} */


  update(options) {
    return this.metaplex.operations().getTask(updateAuctionHouseOperation(options));
  }
  /** {@inheritDoc withdrawFromBuyerAccountOperation} */


  withdrawFromBuyerAccount(input) {
    return this.metaplex.operations().getTask(withdrawFromBuyerAccountOperation(input));
  }
  /** {@inheritDoc withdrawFromFeeAccountOperation} */


  withdrawFromFeeAccount(input) {
    return this.metaplex.operations().getTask(withdrawFromFeeAccountOperation(input));
  }
  /** {@inheritDoc withdrawFromTreasuryAccountOperation} */


  withdrawFromTreasuryAccount(input) {
    return this.metaplex.operations().getTask(withdrawFromTreasuryAccountOperation(input));
  }

}

export { AuctionHouseClient };
//# sourceMappingURL=AuctionHouseClient.mjs.map
