'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Bid = require('../models/Bid.cjs');
var Operation = require('../../../types/Operation.cjs');

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

const findBidByReceiptOperation = Operation.useOperation(Key);
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
    const account = accounts.toBidReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyBid = Bid.toLazyBid(account, auctionHouse);
    return metaplex.auctionHouse().loadBid({
      lazyBid,
      ...operation.input
    }).run(scope);
  }
};

exports.findBidByReceiptOperation = findBidByReceiptOperation;
exports.findBidByReceiptOperationHandler = findBidByReceiptOperationHandler;
//# sourceMappingURL=findBidByReceipt.cjs.map
