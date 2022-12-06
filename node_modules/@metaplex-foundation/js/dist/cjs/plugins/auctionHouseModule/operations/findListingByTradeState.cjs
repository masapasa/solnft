'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');

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

const findListingByTradeStateOperation = Operation.useOperation(Key);
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
    const receiptAddress = pdas.findListingReceiptPda(tradeStateAddress);
    return metaplex.auctionHouse().findListingByReceipt({
      receiptAddress,
      ...operation.input
    }).run(scope);
  }
};

exports.findListingByTradeStateOperation = findListingByTradeStateOperation;
exports.findListingByTradeStateOperationHandler = findListingByTradeStateOperationHandler;
//# sourceMappingURL=findListingByTradeState.cjs.map
