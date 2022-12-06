'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas$1 = require('../pdas.cjs');
var errors = require('../errors.cjs');
var Operation = require('../../../types/Operation.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var pdas = require('../../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Signer = require('../../../types/Signer.cjs');

// Operation
// -----------------

const Key = 'DepositToBuyerAccountOperation';
/**
 * Adds funds to the user's buyer escrow account for the given auction house.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .depositToBuyerAccount({ auctionHouse, buyer, amount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const depositToBuyerAccountOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const depositToBuyerAccountOperationHandler = {
  handle: async (operation, metaplex) => depositToBuyerAccountBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Adds funds to the user's buyer escrow account for the given auction house.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .depositToBuyerAccount({ auctionHouse, buyer, amount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const depositToBuyerAccountBuilder = (metaplex, params) => {
  // Data.
  const {
    auctionHouse,
    auctioneerAuthority,
    amount,
    instructionKey,
    buyer = metaplex.identity(),
    payer = metaplex.identity()
  } = params;

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  } // Accounts.


  const paymentAccount = auctionHouse.isNative ? PublicKey.toPublicKey(buyer) : pdas.findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, PublicKey.toPublicKey(buyer));
  const escrowPayment = pdas$1.findAuctionHouseBuyerEscrowPda(auctionHouse.address, PublicKey.toPublicKey(buyer));
  const accounts = {
    wallet: PublicKey.toPublicKey(buyer),
    paymentAccount,
    transferAuthority: PublicKey.toPublicKey(buyer),
    escrowPaymentAccount: escrowPayment,
    treasuryMint: auctionHouse.treasuryMint.address,
    authority: auctionHouse.authorityAddress,
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress
  }; // Args.

  const args = {
    escrowPaymentBump: escrowPayment.bump,
    amount: amount.basisPoints
  }; // Deposit Instruction.

  let depositInstruction = mplAuctionHouse.createDepositInstruction(accounts, args);

  if (auctioneerAuthority) {
    const ahAuctioneerPda = pdas$1.findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey);
    const accountsWithAuctioneer = { ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda
    };
    depositInstruction = mplAuctionHouse.createAuctioneerDepositInstruction({ ...accountsWithAuctioneer
    }, args);
  } // Signers.


  const depositSigners = [buyer, auctioneerAuthority].filter(Signer.isSigner);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Deposit.
  .add({
    instruction: depositInstruction,
    signers: depositSigners,
    key: instructionKey !== null && instructionKey !== void 0 ? instructionKey : 'depositToBuyerAccount'
  });
};

exports.depositToBuyerAccountBuilder = depositToBuyerAccountBuilder;
exports.depositToBuyerAccountOperation = depositToBuyerAccountOperation;
exports.depositToBuyerAccountOperationHandler = depositToBuyerAccountOperationHandler;
//# sourceMappingURL=depositToBuyerAccount.cjs.map
