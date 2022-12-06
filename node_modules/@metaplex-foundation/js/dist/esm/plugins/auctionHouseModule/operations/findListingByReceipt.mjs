import { toListingReceiptAccount } from '../accounts.mjs';
import { toLazyListing } from '../models/Listing.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// -----------------
// Operation
// -----------------
const Key = 'FindListingByReceiptOperation';
/**
 * Finds a Listing by its receipt address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findListingByReceipt({ receiptAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findListingByReceiptOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findListingByReceiptOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      receiptAddress,
      auctionHouse,
      commitment
    } = operation.input;
    const account = toListingReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyListing = toLazyListing(account, auctionHouse);
    return metaplex.auctionHouse().loadListing({
      lazyListing,
      ...operation.input
    }).run(scope);
  }
};

export { findListingByReceiptOperation, findListingByReceiptOperationHandler };
//# sourceMappingURL=findListingByReceipt.mjs.map
