'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var BidReceiptGpaBuilder = require('./gpaBuilders/BidReceiptGpaBuilder.cjs');
var ListingReceiptGpaBuilder = require('./gpaBuilders/ListingReceiptGpaBuilder.cjs');
var PurchaseReceiptGpaBuilder = require('./gpaBuilders/PurchaseReceiptGpaBuilder.cjs');

/** @group Programs */

const AuctionHouseProgram = {
  publicKey: mplAuctionHouse.PROGRAM_ID,

  bidAccounts(metaplex) {
    return new BidReceiptGpaBuilder.BidReceiptGpaBuilder(metaplex, this.publicKey);
  },

  listingAccounts(metaplex) {
    return new ListingReceiptGpaBuilder.ListingReceiptGpaBuilder(metaplex, this.publicKey);
  },

  purchaseAccounts(metaplex) {
    return new PurchaseReceiptGpaBuilder.PurchaseReceiptGpaBuilder(metaplex, this.publicKey);
  }

};

exports.AuctionHouseProgram = AuctionHouseProgram;
//# sourceMappingURL=program.cjs.map
