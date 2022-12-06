import { PROGRAM_ID } from '@metaplex-foundation/mpl-auction-house';
import { BidReceiptGpaBuilder } from './gpaBuilders/BidReceiptGpaBuilder.mjs';
import { ListingReceiptGpaBuilder } from './gpaBuilders/ListingReceiptGpaBuilder.mjs';
import { PurchaseReceiptGpaBuilder } from './gpaBuilders/PurchaseReceiptGpaBuilder.mjs';

/** @group Programs */

const AuctionHouseProgram = {
  publicKey: PROGRAM_ID,

  bidAccounts(metaplex) {
    return new BidReceiptGpaBuilder(metaplex, this.publicKey);
  },

  listingAccounts(metaplex) {
    return new ListingReceiptGpaBuilder(metaplex, this.publicKey);
  },

  purchaseAccounts(metaplex) {
    return new PurchaseReceiptGpaBuilder(metaplex, this.publicKey);
  }

};

export { AuctionHouseProgram };
//# sourceMappingURL=program.mjs.map
