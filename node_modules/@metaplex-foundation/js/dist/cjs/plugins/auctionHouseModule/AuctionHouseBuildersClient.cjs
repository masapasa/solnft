'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createAuctionHouse = require('./operations/createAuctionHouse.cjs');
var createBid = require('./operations/createBid.cjs');
var createListing = require('./operations/createListing.cjs');
var executeSale = require('./operations/executeSale.cjs');
var updateAuctionHouse = require('./operations/updateAuctionHouse.cjs');
var cancelBid = require('./operations/cancelBid.cjs');
var cancelListing = require('./operations/cancelListing.cjs');
var depositToBuyerAccount = require('./operations/depositToBuyerAccount.cjs');
var withdrawFromBuyerAccount = require('./operations/withdrawFromBuyerAccount.cjs');

/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the Auction House module.
 *
 * @see {@link AuctionsClient}
 * @group Module Builders
 * */

class AuctionHouseBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /** {@inheritDoc createBidBuilder} */


  bid(input) {
    return createBid.createBidBuilder(this.metaplex, input);
  }
  /** {@inheritDoc cancelBidBuilder} */


  cancelBid(input) {
    return cancelBid.cancelBidBuilder(input);
  }
  /** {@inheritDoc cancelListingBuilder} */


  cancelListing(input) {
    return cancelListing.cancelListingBuilder(input);
  }
  /** {@inheritDoc createAuctionHouseBuilder} */


  createAuctionHouse(input) {
    return createAuctionHouse.createAuctionHouseBuilder(this.metaplex, input);
  }
  /** {@inheritDoc depositToBuyerAccountBuilder} */


  depositToBuyerAccount(input) {
    return depositToBuyerAccount.depositToBuyerAccountBuilder(this.metaplex, input);
  }
  /** {@inheritDoc executeSaleBuilder} */


  executeSale(input) {
    return executeSale.executeSaleBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createListingBuilder} */


  list(input) {
    return createListing.createListingBuilder(this.metaplex, input);
  }
  /** {@inheritDoc updateAuctionHouseBuilder} */


  updateAuctionHouse(input) {
    return updateAuctionHouse.updateAuctionHouseBuilder(this.metaplex, input);
  }
  /** {@inheritDoc withdrawFromBuyerAccountBuilder} */


  withdrawFromBuyerAccount(input) {
    return withdrawFromBuyerAccount.withdrawFromBuyerAccountBuilder(this.metaplex, input);
  }

}

exports.AuctionHouseBuildersClient = AuctionHouseBuildersClient;
//# sourceMappingURL=AuctionHouseBuildersClient.cjs.map
