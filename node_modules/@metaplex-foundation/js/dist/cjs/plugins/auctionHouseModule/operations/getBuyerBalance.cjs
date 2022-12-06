'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'GetBuyerBalanceOperation';
/**
 * Gets the balance of a buyer's escrow account for a given Auction House.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .getBuyerBalance({ auctionHouse, buyerAddress })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const getBuyerBalanceOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const getBuyerBalanceOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      auctionHouse,
      buyerAddress,
      commitment
    } = operation.input;
    const buyerEscrow = pdas.findAuctionHouseBuyerEscrowPda(auctionHouse, buyerAddress);
    return metaplex.rpc().getBalance(buyerEscrow, commitment);
  }
};

exports.getBuyerBalanceOperation = getBuyerBalanceOperation;
exports.getBuyerBalanceOperationHandler = getBuyerBalanceOperationHandler;
//# sourceMappingURL=getBuyerBalance.cjs.map
