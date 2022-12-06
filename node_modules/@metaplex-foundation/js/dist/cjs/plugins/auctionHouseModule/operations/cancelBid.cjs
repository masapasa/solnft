'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var errors = require('../errors.cjs');
var pdas$1 = require('../pdas.cjs');
var pdas = require('../../tokenModule/pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Signer = require('../../../types/Signer.cjs');

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

const cancelBidOperation = Operation.useOperation(Key);
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
    throw new errors.AuctioneerAuthorityRequiredError();
  } // Accounts.


  const tokenAccount = isPublic ? pdas.findAssociatedTokenAccountPda(asset.mint.address, PublicKey.toPublicKey(buyerAddress)) : asset.token.address;
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

  let cancelBidInstruction = mplAuctionHouse.createCancelInstruction(accounts, args);

  if (auctioneerAuthority) {
    cancelBidInstruction = mplAuctionHouse.createAuctioneerCancelInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: pdas$1.findAuctioneerPda(auctionHouseAddress, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const cancelSigners = [auctioneerAuthority].filter(Signer.isSigner);
  return TransactionBuilder.TransactionBuilder.make() // Cancel Bid.
  .add({
    instruction: cancelBidInstruction,
    signers: cancelSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'cancelBid'
  }) // Cancel Bid Receipt.
  .when(Boolean(receiptAddress), builder => builder.add({
    instruction: mplAuctionHouse.createCancelBidReceiptInstruction({
      receipt: receiptAddress,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }),
    signers: [],
    key: 'cancelBidReceipt'
  }));
};

exports.cancelBidBuilder = cancelBidBuilder;
exports.cancelBidOperation = cancelBidOperation;
exports.cancelBidOperationHandler = cancelBidOperationHandler;
//# sourceMappingURL=cancelBid.cjs.map
