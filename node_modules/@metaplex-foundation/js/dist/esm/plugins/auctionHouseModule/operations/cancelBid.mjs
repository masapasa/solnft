import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { createCancelInstruction, createAuctioneerCancelInstruction, createCancelBidReceiptInstruction } from '@metaplex-foundation/mpl-auction-house';
import { AuctioneerAuthorityRequiredError } from '../errors.mjs';
import { findAuctioneerPda } from '../pdas.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../../types/Signer.mjs';

// -----------------
// Operation
// -----------------
const Key = 'CancelBidOperation';
/**
 * Cancels the user's bid in the given auction house.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .cancelBid({ auctionHouse, bid })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const cancelBidOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const cancelBidOperationHandler = {
  handle: async (operation, metaplex) => cancelBidBuilder(operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Cancels the user's bid in the given auction house.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .cancelBid({ auctionHouse, bid });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const cancelBidBuilder = params => {
  var _params$instructionKe;

  const {
    auctionHouse,
    auctioneerAuthority,
    bid
  } = params; // Data.

  const {
    asset,
    buyerAddress,
    tradeStateAddress,
    price,
    receiptAddress,
    tokens,
    isPublic
  } = bid;
  const {
    authorityAddress,
    address: auctionHouseAddress,
    feeAccountAddress,
    hasAuctioneer
  } = auctionHouse;

  if (hasAuctioneer && !auctioneerAuthority) {
    throw new AuctioneerAuthorityRequiredError();
  } // Accounts.


  const tokenAccount = isPublic ? findAssociatedTokenAccountPda(asset.mint.address, toPublicKey(buyerAddress)) : asset.token.address;
  const accounts = {
    wallet: buyerAddress,
    tokenAccount,
    tokenMint: asset.address,
    authority: authorityAddress,
    auctionHouse: auctionHouseAddress,
    auctionHouseFeeAccount: feeAccountAddress,
    tradeState: tradeStateAddress
  }; // Args.

  const args = {
    buyerPrice: price.basisPoints,
    tokenSize: tokens.basisPoints
  }; // Cancel Bid Instruction.

  let cancelBidInstruction = createCancelInstruction(accounts, args);

  if (auctioneerAuthority) {
    cancelBidInstruction = createAuctioneerCancelInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: findAuctioneerPda(auctionHouseAddress, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const cancelSigners = [auctioneerAuthority].filter(isSigner);
  return TransactionBuilder.make() // Cancel Bid.
  .add({
    instruction: cancelBidInstruction,
    signers: cancelSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'cancelBid'
  }) // Cancel Bid Receipt.
  .when(Boolean(receiptAddress), builder => builder.add({
    instruction: createCancelBidReceiptInstruction({
      receipt: receiptAddress,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY
    }),
    signers: [],
    key: 'cancelBidReceipt'
  }));
};

export { cancelBidBuilder, cancelBidOperation, cancelBidOperationHandler };
//# sourceMappingURL=cancelBid.mjs.map
