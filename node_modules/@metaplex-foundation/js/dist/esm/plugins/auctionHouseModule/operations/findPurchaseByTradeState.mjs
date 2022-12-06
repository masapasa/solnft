import { findPurchaseReceiptPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindPurchaseByTradeStateOperation';
/**
 * Finds a Purchase by its trade state address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findPurchaseByTradeState({ sellerTradeState, buyerTradeState, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findPurchaseByTradeStateOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findPurchaseByTradeStateOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      sellerTradeState,
      buyerTradeState
    } = operation.input;
    const receiptAddress = findPurchaseReceiptPda(sellerTradeState, buyerTradeState);
    return metaplex.auctionHouse().findPurchaseByReceipt({
      receiptAddress,
      ...operation.input
    }).run(scope);
  }
};

export { findPurchaseByTradeStateOperation, findPurchaseByTradeStateOperationHandler };
//# sourceMappingURL=findPurchaseByTradeState.mjs.map
