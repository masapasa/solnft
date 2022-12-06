import { createWithdrawFromFeeInstruction } from '@metaplex-foundation/mpl-auction-house';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// -----------------
// Operation
// -----------------
const Key = 'WithdrawFromFeeAccountOperation';
/**
 * Transfers funds from Auction House Fee Wallet to the Fee Withdrawal Destination Wallet.
 * By default Fee Withdrawal Destination Wallet is set to `metaplex.identity()`.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .withdrawFromFeeAccount({ auctionHouse, amount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const withdrawFromFeeAccountOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const withdrawFromFeeAccountOperationHandler = {
  handle: async (operation, metaplex) => withdrawFromFeeAccountBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Transfers funds from Auction House Fee Wallet to the Fee Withdrawal Destination Wallet.
 * By default Fee Withdrawal Destination Wallet is set to `metaplex.identity()`.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .withdrawFromFeeAccount({ auctionHouse, amount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const withdrawFromFeeAccountBuilder = (metaplex, params) => {
  // Data.
  const {
    auctionHouse,
    amount,
    instructionKey,
    payer = metaplex.identity(),
    authority = metaplex.identity()
  } = params; // Accounts.

  const accounts = {
    authority: auctionHouse.authorityAddress,
    feeWithdrawalDestination: auctionHouse.feeWithdrawalDestinationAddress,
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress
  }; // Args.

  const args = {
    amount: amount.basisPoints
  }; // Withdraw From Fee Instruction.

  const withdrawFromFeeInstruction = createWithdrawFromFeeInstruction(accounts, args); // Signers.

  return TransactionBuilder.make().setFeePayer(payer) // Withdraw From Fee.
  .add({
    instruction: withdrawFromFeeInstruction,
    signers: [authority],
    key: instructionKey !== null && instructionKey !== void 0 ? instructionKey : 'withdrawFromFeeAccount'
  });
};

export { withdrawFromFeeAccountBuilder, withdrawFromFeeAccountOperation, withdrawFromFeeAccountOperationHandler };
//# sourceMappingURL=withdrawFromFeeAccount.mjs.map
