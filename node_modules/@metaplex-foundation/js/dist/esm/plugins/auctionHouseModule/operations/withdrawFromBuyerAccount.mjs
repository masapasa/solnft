import { createWithdrawInstruction, createAuctioneerWithdrawInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHouseBuyerEscrowPda, findAuctioneerPda } from '../pdas.mjs';
import { AuctioneerAuthorityRequiredError, WithdrawFromBuyerAccountRequiresSignerError } from '../errors.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

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

const withdrawFromBuyerAccountOperation = useOperation(Key);
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
    throw new AuctioneerAuthorityRequiredError();
  }

  const amountBasisPoint = amount.basisPoints;
  const buyer = (_params$buyer = params.buyer) !== null && _params$buyer !== void 0 ? _params$buyer : metaplex.identity();
  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : auctionHouse.authorityAddress;

  if (!isSigner(buyer) && !isSigner(authority)) {
    throw new WithdrawFromBuyerAccountRequiresSignerError();
  }

  const escrowPayment = findAuctionHouseBuyerEscrowPda(auctionHouse.address, toPublicKey(buyer)); // Accounts,

  const accounts = {
    wallet: toPublicKey(buyer),
    receiptAccount: toPublicKey(buyer),
    escrowPaymentAccount: escrowPayment,
    treasuryMint: auctionHouse.treasuryMint.address,
    authority: toPublicKey(authority),
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress
  }; // Args.

  const args = {
    escrowPaymentBump: escrowPayment.bump,
    amount: amountBasisPoint
  }; // Withdraw Instruction.

  let withdrawInstruction = createWithdrawInstruction(accounts, args);

  if (auctioneerAuthority) {
    const ahAuctioneerPda = findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey);
    const accountsWithAuctioneer = { ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda
    };
    withdrawInstruction = createAuctioneerWithdrawInstruction(accountsWithAuctioneer, args);
  } // Signers.


  const signer = isSigner(buyer) ? buyer : authority;
  const withdrawSigners = [signer, params.auctioneerAuthority].filter(isSigner); // Update the account to be a signer since it's not covered properly by MPL due to its dynamic nature.

  const signerKeyIndex = withdrawInstruction.keys.findIndex(key => key.pubkey.equals(signer.publicKey));
  withdrawInstruction.keys[signerKeyIndex].isSigner = true;
  return TransactionBuilder.make().setFeePayer(payer) // Withdraw.
  .add({
    instruction: withdrawInstruction,
    signers: withdrawSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'withdrawFromBuyerAccount'
  });
};

export { withdrawFromBuyerAccountBuilder, withdrawFromBuyerAccountOperation, withdrawFromBuyerAccountOperationHandler };
//# sourceMappingURL=withdrawFromBuyerAccount.mjs.map
