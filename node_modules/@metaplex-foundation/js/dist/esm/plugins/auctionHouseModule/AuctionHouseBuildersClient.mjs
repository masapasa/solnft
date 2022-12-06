import { createAuctionHouseBuilder } from './operations/createAuctionHouse.mjs';
import { createBidBuilder } from './operations/createBid.mjs';
import { createListingBuilder } from './operations/createListing.mjs';
import { executeSaleBuilder } from './operations/executeSale.mjs';
import { updateAuctionHouseBuilder } from './operations/updateAuctionHouse.mjs';
import { cancelBidBuilder } from './operations/cancelBid.mjs';
import { cancelListingBuilder } from './operations/cancelListing.mjs';
import { depositToBuyerAccountBuilder } from './operations/depositToBuyerAccount.mjs';
import { withdrawFromBuyerAccountBuilder } from './operations/withdrawFromBuyerAccount.mjs';

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
    return createBidBuilder(this.metaplex, input);
  }
  /** {@inheritDoc cancelBidBuilder} */


  cancelBid(input) {
    return cancelBidBuilder(input);
  }
  /** {@inheritDoc cancelListingBuilder} */


  cancelListing(input) {
    return cancelListingBuilder(input);
  }
  /** {@inheritDoc createAuctionHouseBuilder} */


  createAuctionHouse(input) {
    return createAuctionHouseBuilder(this.metaplex, input);
  }
  /** {@inheritDoc depositToBuyerAccountBuilder} */


  depositToBuyerAccount(input) {
    return depositToBuyerAccountBuilder(this.metaplex, input);
  }
  /** {@inheritDoc executeSaleBuilder} */


  executeSale(input) {
    return executeSaleBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createListingBuilder} */


  list(input) {
    return createListingBuilder(this.metaplex, input);
  }
  /** {@inheritDoc updateAuctionHouseBuilder} */


  updateAuctionHouse(input) {
    return updateAuctionHouseBuilder(this.metaplex, input);
  }
  /** {@inheritDoc withdrawFromBuyerAccountBuilder} */


  withdrawFromBuyerAccount(input) {
    return withdrawFromBuyerAccountBuilder(this.metaplex, input);
  }

}

export { AuctionHouseBuildersClient };
//# sourceMappingURL=AuctionHouseBuildersClient.mjs.map
