'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

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

const withdrawFromFeeAccountOperation = Operation.useOperation(Key);
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

  const withdrawFromFeeInstruction = mplAuctionHouse.createWithdrawFromFeeInstruction(accounts, args); // Signers.

  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Withdraw From Fee.
  .add({
    instruction: withdrawFromFeeInstruction,
    signers: [authority],
    key: instructionKey !== null && instructionKey !== void 0 ? instructionKey : 'withdrawFromFeeAccount'
  });
};

exports.withdrawFromFeeAccountBuilder = withdrawFromFeeAccountBuilder;
exports.withdrawFromFeeAccountOperation = withdrawFromFeeAccountOperation;
exports.withdrawFromFeeAccountOperationHandler = withdrawFromFeeAccountOperationHandler;
//# sourceMappingURL=withdrawFromFeeAccount.cjs.map
