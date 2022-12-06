import { findAuctionHouseBuyerEscrowPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';

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

const getBuyerBalanceOperation = useOperation(Key);
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
    const buyerEscrow = findAuctionHouseBuyerEscrowPda(auctionHouse, buyerAddress);
    return metaplex.rpc().getBalance(buyerEscrow, commitment);
  }
};

export { getBuyerBalanceOperation, getBuyerBalanceOperationHandler };
//# sourceMappingURL=getBuyerBalance.mjs.map
