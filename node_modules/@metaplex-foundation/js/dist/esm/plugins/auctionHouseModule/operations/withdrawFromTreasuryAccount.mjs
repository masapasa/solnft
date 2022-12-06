import { createWithdrawFromTreasuryInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHouseTreasuryPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'WithdrawFromTreasuryAccountOperation';
/**
 * Transfers funds from Auction House Treasury Wallet to the Treasury Withdrawal Destination Wallet set on an Auction House creation.
 * By default Treasury Withdrawal Destination Wallet is set to `metaplex.identity()`.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .withdrawFromTreasuryAccount({ auctionHouse, amount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const withdrawFromTreasuryAccountOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const withdrawFromTreasuryAccountOperationHandler = {
  handle: async (operation, metaplex) => withdrawFromTreasuryAccountBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Transfers funds from Auction House Treasury Wallet to the Treasury Withdrawal Destination Wallet set on an Auction House creation.
 * By default Treasury Withdrawal Destination Wallet is set to `metaplex.identity()`.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .withdrawFromTreasuryAccount({ auctionHouse, amount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const withdrawFromTreasuryAccountBuilder = (metaplex, params) => {
  // Data.
  const {
    auctionHouse,
    amount,
    instructionKey,
    payer = metaplex.identity(),
    authority = metaplex.identity()
  } = params; // Accounts.

  const auctionHouseTreasury = findAuctionHouseTreasuryPda(auctionHouse.address);
  const accounts = {
    treasuryMint: auctionHouse.treasuryMint.address,
    authority: auctionHouse.authorityAddress,
    treasuryWithdrawalDestination: auctionHouse.treasuryWithdrawalDestinationAddress,
    auctionHouseTreasury: auctionHouseTreasury,
    auctionHouse: auctionHouse.address
  }; // Args.

  const args = {
    amount: amount.basisPoints
  }; // Withdraw From Treasury Instruction.

  const withdrawFromTreasuryInstruction = createWithdrawFromTreasuryInstruction(accounts, args); // Signers.

  return TransactionBuilder.make().setFeePayer(payer) // Withdraw From Treasury.
  .add({
    instruction: withdrawFromTreasuryInstruction,
    signers: [authority],
    key: instructionKey !== null && instructionKey !== void 0 ? instructionKey : 'withdrawFromTreasuryAccount'
  });
};

export { withdrawFromTreasuryAccountBuilder, withdrawFromTreasuryAccountOperation, withdrawFromTreasuryAccountOperationHandler };
//# sourceMappingURL=withdrawFromTreasuryAccount.mjs.map
