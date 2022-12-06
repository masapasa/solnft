import { AuctionHouseProgram } from '../program.mjs';
import { toListingReceiptAccount } from '../accounts.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { UnreachableCaseError } from '../../../errors/SdkError.mjs';
import { findMetadataPda } from '../../nftModule/pdas.mjs';
import { toLazyListing } from '../models/Listing.mjs';

// Operation
// -----------------

const Key = 'FindListingsByPublicKeyOperation';
/**
 * Finds multiple Listings by specific criteria.
 *
 * ```ts
 * // Find listings by seller.
 * const listings = await metaplex
 *   .auctionHouse()
 *   .findListingsBy({ auctionHouse, type: 'seller', publicKey: seller })
 *   .run();
 *
 * // Find listings by metadata.
 * const listings = await metaplex
 *   .auctionHouse()
 *   .findListingsBy({ auctionHouse, type: 'metadata', publicKey: metadata })
 *   .run();
 *
 * // Find listings by mint.
 * const listings = await metaplex
 *   .auctionHouse()
 *   .findListingsBy({ auctionHouse, type: 'mint', publicKey: mint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findListingsByPublicKeyFieldOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findListingsByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      auctionHouse,
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts = AuctionHouseProgram.listingAccounts(metaplex).mergeConfig({
      commitment
    });
    let listingQuery = accounts.whereAuctionHouse(auctionHouse.address);

    switch (type) {
      case 'seller':
        listingQuery = listingQuery.whereSeller(publicKey);
        break;

      case 'metadata':
        listingQuery = listingQuery.whereMetadata(publicKey);
        break;

      case 'mint':
        listingQuery = listingQuery.whereMetadata(findMetadataPda(publicKey));
        break;

      default:
        throw new UnreachableCaseError(type);
    }

    scope.throwIfCanceled();
    return listingQuery.getAndMap(account => toLazyListing(toListingReceiptAccount(account), auctionHouse));
  }
};

export { findListingsByPublicKeyFieldOperation, findListingsByPublicKeyFieldOperationHandler };
//# sourceMappingURL=findListingsByPublicKeyField.mjs.map
