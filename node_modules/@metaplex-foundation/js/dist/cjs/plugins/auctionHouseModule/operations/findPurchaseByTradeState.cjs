'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');

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

const findPurchaseByTradeStateOperation = Operation.useOperation(Key);
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
    const receiptAddress = pdas.findPurchaseReceiptPda(sellerTradeState, buyerTradeState);
    return metaplex.auctionHouse().findPurchaseByReceipt({
      receiptAddress,
      ...operation.input
    }).run(scope);
  }
};

exports.findPurchaseByTradeStateOperation = findPurchaseByTradeStateOperation;
exports.findPurchaseByTradeStateOperationHandler = findPurchaseByTradeStateOperationHandler;
//# sourceMappingURL=findPurchaseByTradeState.cjs.map
