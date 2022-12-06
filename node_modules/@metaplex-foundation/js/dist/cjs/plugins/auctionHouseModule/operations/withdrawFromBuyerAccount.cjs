'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas = require('../pdas.cjs');
var errors = require('../errors.cjs');
var Operation = require('../../../types/Operation.cjs');
var Signer = require('../../../types/Signer.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'WithdrawFromBuyerAccountOperation';
/**
 * Withdraws funds from the user's buyer escrow account for the given auction house.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .withdraw({ auctionHouse, buyer, amount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const withdrawFromBuyerAccountOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const withdrawFromBuyerAccountOperationHandler = {
  handle: async (operation, metaplex) => withdrawFromBuyerAccountBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Withdraws funds from the user's buyer escrow account to the given auction house.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .withdrawFromBuyerAccountBuilder({ auctionHouse, buyer, amount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const withdrawFromBuyerAccountBuilder = (metaplex, params) => {
  var _params$buyer, _params$authority, _params$instructionKe;

  const {
    auctionHouse,
    auctioneerAuthority,
    amount,
    payer = metaplex.identity()
  } = params;

  if (auctionHouse.hasAuctioneer && !params.auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  }

  const amountBasisPoint = amount.basisPoints;
  const buyer = (_params$buyer = params.buyer) !== null && _params$buyer !== void 0 ? _params$buyer : metaplex.identity();
  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : auctionHouse.authorityAddress;

  if (!Signer.isSigner(buyer) && !Signer.isSigner(authority)) {
    throw new errors.WithdrawFromBuyerAccountRequiresSignerError();
  }

  const escrowPayment = pdas.findAuctionHouseBuyerEscrowPda(auctionHouse.address, PublicKey.toPublicKey(buyer)); // Accounts,

  const accounts = {
    wallet: PublicKey.toPublicKey(buyer),
    receiptAccount: PublicKey.toPublicKey(buyer),
    escrowPaymentAccount: escrowPayment,
    treasuryMint: auctionHouse.treasuryMint.address,
    authority: PublicKey.toPublicKey(authority),
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress
  }; // Args.

  const args = {
    escrowPaymentBump: escrowPayment.bump,
    amount: amountBasisPoint
  }; // Withdraw Instruction.

  let withdrawInstruction = mplAuctionHouse.createWithdrawInstruction(accounts, args);

  if (auctioneerAuthority) {
    const ahAuctioneerPda = pdas.findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey);
    const accountsWithAuctioneer = { ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda
    };
    withdrawInstruction = mplAuctionHouse.createAuctioneerWithdrawInstruction(accountsWithAuctioneer, args);
  } // Signers.


  const signer = Signer.isSigner(buyer) ? buyer : authority;
  const withdrawSigners = [signer, params.auctioneerAuthority].filter(Signer.isSigner); // Update the account to be a signer since it's not covered properly by MPL due to its dynamic nature.

  const signerKeyIndex = withdrawInstruction.keys.findIndex(key => key.pubkey.equals(signer.publicKey));
  withdrawInstruction.keys[signerKeyIndex].isSigner = true;
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Withdraw.
  .add({
    instruction: withdrawInstruction,
    signers: withdrawSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'withdrawFromBuyerAccount'
  });
};

exports.withdrawFromBuyerAccountBuilder = withdrawFromBuyerAccountBuilder;
exports.withdrawFromBuyerAccountOperation = withdrawFromBuyerAccountOperation;
exports.withdrawFromBuyerAccountOperationHandler = withdrawFromBuyerAccountOperationHandler;
//# sourceMappingURL=withdrawFromBuyerAccount.cjs.map
