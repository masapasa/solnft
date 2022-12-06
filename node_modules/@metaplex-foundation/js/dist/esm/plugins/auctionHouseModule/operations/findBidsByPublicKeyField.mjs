import { AuctionHouseProgram } from '../program.mjs';
import { toBidReceiptAccount } from '../accounts.mjs';
import { UnreachableCaseError } from '../../../errors/SdkError.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { findMetadataPda } from '../../nftModule/pdas.mjs';
import { toLazyBid } from '../models/Bid.mjs';

// Operation
// -----------------

const Key = 'FindBidsByPublicKeyOperation';
/**
 * Finds multiple Bids by specific criteria.
 *
 * ```ts
 * // Find bids by buyer.
 * const bids = await metaplex
 *   .auctionHouse()
 *   .findBidsBy({ auctionHouse, type: 'buyer', publicKey: buyer })
 *   .run();
 *
 * // Find bids by metadata.
 * const bids = await metaplex
 *   .auctionHouse()
 *   .findBidsBy({ auctionHouse, type: 'metadata', publicKey: metadata })
 *   .run();
 *
 * // Find bids by mint.
 * const bids = await metaplex
 *   .auctionHouse()
 *   .findBidsBy({ auctionHouse, type: 'mint', publicKey: mint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findBidsByPublicKeyFieldOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findBidsByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      auctionHouse,
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts = AuctionHouseProgram.bidAccounts(metaplex).mergeConfig({
      commitment
    });
    let bidQuery = accounts.whereAuctionHouse(auctionHouse.address);

    switch (type) {
      case 'buyer':
        bidQuery = bidQuery.whereBuyer(publicKey);
        break;

      case 'metadata':
        bidQuery = bidQuery.whereMetadata(publicKey);
        break;

      case 'mint':
        bidQuery = bidQuery.whereMetadata(findMetadataPda(publicKey));
        break;

      default:
        throw new UnreachableCaseError(type);
    }

    scope.throwIfCanceled();
    return bidQuery.getAndMap(account => toLazyBid(toBidReceiptAccount(account), auctionHouse));
  }
};

export { findBidsByPublicKeyFieldOperation, findBidsByPublicKeyFieldOperationHandler };
//# sourceMappingURL=findBidsByPublicKeyField.mjs.map
