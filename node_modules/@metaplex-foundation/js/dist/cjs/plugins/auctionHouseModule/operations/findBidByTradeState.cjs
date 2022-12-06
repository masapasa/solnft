'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');

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

const findBidByTradeStateOperation = Operation.useOperation(Key);
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
    const receiptAddress = pdas.findBidReceiptPda(tradeStateAddress);
    return metaplex.auctionHouse().findBidByReceipt({
      receiptAddress,
      ...operation.input
    }).run(scope);
  }
};

exports.findBidByTradeStateOperation = findBidByTradeStateOperation;
exports.findBidByTradeStateOperationHandler = findBidByTradeStateOperationHandler;
//# sourceMappingURL=findBidByTradeState.cjs.map
