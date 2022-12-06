import { findListingReceiptPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindListingByTradeStateOperation';
/**
 * Finds a Listing by its trade state address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findListingByTradeState({ tradeStateAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findListingByTradeStateOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findListingByTradeStateOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      tradeStateAddress
    } = operation.input;
    const receiptAddress = findListingReceiptPda(tradeStateAddress);
    return metaplex.auctionHouse().findListingByReceipt({
      receiptAddress,
      ...operation.input
    }).run(scope);
  }
};

export { findListingByTradeStateOperation, findListingByTradeStateOperationHandler };
//# sourceMappingURL=findListingByTradeState.mjs.map
