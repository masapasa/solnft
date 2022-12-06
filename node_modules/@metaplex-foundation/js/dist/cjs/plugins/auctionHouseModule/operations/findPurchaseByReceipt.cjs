'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Purchase = require('../models/Purchase.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindPurchaseByReceiptOperation';
/**
 * Finds a Purchase by its receipt address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findPurchaseByReceipt({ receiptAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findPurchaseByReceiptOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findPurchaseByReceiptOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      receiptAddress,
      auctionHouse,
      commitment
    } = operation.input;
    const account = accounts.toPurchaseReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyPurchase = Purchase.toLazyPurchase(account, auctionHouse);
    return metaplex.auctionHouse().loadPurchase({
      lazyPurchase,
      ...operation.input
    }).run(scope);
  }
};

exports.findPurchaseByReceiptOperation = findPurchaseByReceiptOperation;
exports.findPurchaseByReceiptOperationHandler = findPurchaseByReceiptOperationHandler;
//# sourceMappingURL=findPurchaseByReceipt.cjs.map
