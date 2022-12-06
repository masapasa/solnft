import { createDepositInstruction, createAuctioneerDepositInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHouseBuyerEscrowPda, findAuctioneerPda } from '../pdas.mjs';
import { AuctioneerAuthorityRequiredError } from '../errors.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../../types/Signer.mjs';

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

const depositToBuyerAccountOperation = useOperation(Key);
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
    throw new AuctioneerAuthorityRequiredError();
  } // Accounts.


  const paymentAccount = auctionHouse.isNative ? toPublicKey(buyer) : findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, toPublicKey(buyer));
  const escrowPayment = findAuctionHouseBuyerEscrowPda(auctionHouse.address, toPublicKey(buyer));
  const accounts = {
    wallet: toPublicKey(buyer),
    paymentAccount,
    transferAuthority: toPublicKey(buyer),
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

  let depositInstruction = createDepositInstruction(accounts, args);

  if (auctioneerAuthority) {
    const ahAuctioneerPda = findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey);
    const accountsWithAuctioneer = { ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda
    };
    depositInstruction = createAuctioneerDepositInstruction({ ...accountsWithAuctioneer
    }, args);
  } // Signers.


  const depositSigners = [buyer, auctioneerAuthority].filter(isSigner);
  return TransactionBuilder.make().setFeePayer(payer) // Deposit.
  .add({
    instruction: depositInstruction,
    signers: depositSigners,
    key: instructionKey !== null && instructionKey !== void 0 ? instructionKey : 'depositToBuyerAccount'
  });
};

export { depositToBuyerAccountBuilder, depositToBuyerAccountOperation, depositToBuyerAccountOperationHandler };
//# sourceMappingURL=depositToBuyerAccount.mjs.map
