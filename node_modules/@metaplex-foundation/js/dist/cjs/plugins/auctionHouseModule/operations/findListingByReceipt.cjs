'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Listing = require('../models/Listing.cjs');
var Operation = require('../../../types/Operation.cjs');

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

const findListingByReceiptOperation = Operation.useOperation(Key);
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
    const account = accounts.toListingReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyListing = Listing.toLazyListing(account, auctionHouse);
    return metaplex.auctionHouse().loadListing({
      lazyListing,
      ...operation.input
    }).run(scope);
  }
};

exports.findListingByReceiptOperation = findListingByReceiptOperation;
exports.findListingByReceiptOperationHandler = findListingByReceiptOperationHandler;
//# sourceMappingURL=findListingByReceipt.cjs.map
