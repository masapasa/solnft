import { findBidReceiptPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// -----------------
// Operation
// -----------------
const Key = 'FindBidByTradeStateOperation';
/**
 * Finds a Bid by its trade state address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findBidByTradeState({ tradeStateAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findBidByTradeStateOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findBidByTradeStateOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      tradeStateAddress
    } = operation.input;
    const receiptAddress = findBidReceiptPda(tradeStateAddress);
    return metaplex.auctionHouse().findBidByReceipt({
      receiptAddress,
      ...operation.input
    }).run(scope);
  }
};

export { findBidByTradeStateOperation, findBidByTradeStateOperationHandler };
//# sourceMappingURL=findBidByTradeState.mjs.map
