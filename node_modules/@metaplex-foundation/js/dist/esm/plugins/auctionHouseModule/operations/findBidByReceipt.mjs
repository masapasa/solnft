import { toBidReceiptAccount } from '../accounts.mjs';
import { toLazyBid } from '../models/Bid.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindBidByReceiptOperation';
/**
 * Finds a Bid by its receipt address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findBidByReceipt({ receiptAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findBidByReceiptOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findBidByReceiptOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      receiptAddress,
      auctionHouse,
      commitment
    } = operation.input;
    const account = toBidReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyBid = toLazyBid(account, auctionHouse);
    return metaplex.auctionHouse().loadBid({
      lazyBid,
      ...operation.input
    }).run(scope);
  }
};

export { findBidByReceiptOperation, findBidByReceiptOperationHandler };
//# sourceMappingURL=findBidByReceipt.mjs.map
