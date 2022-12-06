'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas$2 = require('../pdas.cjs');
var constants = require('../constants.cjs');
var errors = require('../errors.cjs');
var Operation = require('../../../types/Operation.cjs');
var DateTime = require('../../../types/DateTime.cjs');
var Amount = require('../../../types/Amount.cjs');
var Signer = require('../../../types/Signer.cjs');
var pdas = require('../../nftModule/pdas.cjs');
var pdas$1 = require('../../tokenModule/pdas.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'CreateListingOperation';
/**
 * Creates a listing on a given asset.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .createListing({ auctionHouse, mintAccount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const createListingOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createListingOperationHandler = {
  async handle(operation, metaplex, scope) {
    const {
      auctionHouse,
      confirmOptions
    } = operation.input;
    const output = await createListingBuilder(metaplex, operation.input).sendAndConfirm(metaplex, confirmOptions);
    scope.throwIfCanceled();

    if (output.receipt) {
      const listing = await metaplex.auctionHouse().findListingByReceipt({
        receiptAddress: output.receipt,
        auctionHouse
      }).run(scope);
      return {
        listing,
        ...output
      };
    }

    scope.throwIfCanceled();
    const lazyListing = {
      model: 'listing',
      lazy: true,
      auctionHouse,
      tradeStateAddress: output.sellerTradeState,
      bookkeeperAddress: output.bookkeeper,
      sellerAddress: output.seller,
      metadataAddress: output.metadata,
      receiptAddress: output.receipt,
      purchaseReceiptAddress: null,
      price: output.price,
      tokens: output.tokens.basisPoints,
      createdAt: DateTime.now(),
      canceledAt: null
    };
    return {
      listing: await metaplex.auctionHouse().loadListing({
        lazyListing
      }).run(scope),
      ...output
    };
  }

}; // -----------------
// Builder
// -----------------

/**
 * Creates a listing on a given asset.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .createListing({ auctionHouse, mintAccount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */

/**
 * @group Transaction Builders
 * @category Constructors
 */
const createListingBuilder = (metaplex, params) => {
  var _params$price$basisPo, _params$price, _params$tokenAccount, _params$printReceipt, _params$bookkeeper;

  const {
    auctionHouse,
    auctioneerAuthority,
    mintAccount,
    payer = metaplex.identity(),
    tokens = Amount.token(1),
    seller = metaplex.identity(),
    authority = auctionHouse.authorityAddress
  } = params; // Data.

  const priceBasisPoint = auctioneerAuthority ? constants.AUCTIONEER_PRICE : (_params$price$basisPo = (_params$price = params.price) === null || _params$price === void 0 ? void 0 : _params$price.basisPoints) !== null && _params$price$basisPo !== void 0 ? _params$price$basisPo : 0;
  const price = auctionHouse.isNative ? Amount.lamports(priceBasisPoint) : Amount.amount(priceBasisPoint, auctionHouse.treasuryMint.currency);

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  }

  if (!Signer.isSigner(seller) && !Signer.isSigner(authority)) {
    throw new errors.CreateListingRequiresSignerError();
  } // Accounts.


  const metadata = pdas.findMetadataPda(mintAccount);
  const tokenAccount = (_params$tokenAccount = params.tokenAccount) !== null && _params$tokenAccount !== void 0 ? _params$tokenAccount : pdas$1.findAssociatedTokenAccountPda(mintAccount, PublicKey.toPublicKey(seller));
  const sellerTradeState = pdas$2.findAuctionHouseTradeStatePda(auctionHouse.address, PublicKey.toPublicKey(seller), auctionHouse.treasuryMint.address, mintAccount, price.basisPoints, tokens.basisPoints, tokenAccount);
  const freeSellerTradeState = pdas$2.findAuctionHouseTradeStatePda(auctionHouse.address, PublicKey.toPublicKey(seller), auctionHouse.treasuryMint.address, mintAccount, Amount.lamports(0).basisPoints, tokens.basisPoints, tokenAccount);
  const programAsSigner = pdas$2.findAuctionHouseProgramAsSignerPda();
  const accounts = {
    wallet: PublicKey.toPublicKey(seller),
    tokenAccount,
    metadata,
    authority: PublicKey.toPublicKey(authority),
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress,
    sellerTradeState,
    freeSellerTradeState,
    programAsSigner
  }; // Args.

  const args = {
    tradeStateBump: sellerTradeState.bump,
    freeTradeStateBump: freeSellerTradeState.bump,
    programAsSignerBump: programAsSigner.bump,
    buyerPrice: price.basisPoints,
    tokenSize: tokens.basisPoints
  }; // Sell Instruction.

  let sellInstruction = mplAuctionHouse.createSellInstruction(accounts, args);

  if (auctioneerAuthority) {
    sellInstruction = mplAuctionHouse.createAuctioneerSellInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: pdas$2.findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const signer = Signer.isSigner(seller) ? seller : authority;
  const sellSigners = [signer, auctioneerAuthority].filter(Signer.isSigner); // Update the account to be a signer since it's not covered properly by MPL due to its dynamic nature.

  const signerKeyIndex = sellInstruction.keys.findIndex(key => key.pubkey.equals(signer.publicKey));
  sellInstruction.keys[signerKeyIndex].isSigner = true; // Receipt.
  // Since createPrintListingReceiptInstruction can't deserialize createAuctioneerSellInstruction due to a bug
  // Don't print Auctioneer Sell receipt for the time being.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && !auctioneerAuthority;
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const receipt = pdas$2.findListingReceiptPda(sellerTradeState);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    sellerTradeState,
    freeSellerTradeState,
    tokenAccount,
    metadata,
    seller: PublicKey.toPublicKey(seller),
    receipt: shouldPrintReceipt ? receipt : null,
    bookkeeper: shouldPrintReceipt ? bookkeeper.publicKey : null,
    price,
    tokens
  }) // Create Listing.
  .add({
    instruction: sellInstruction,
    signers: sellSigners,
    key: 'sell'
  }) // Print the Listing Receipt.
  .when(shouldPrintReceipt, builder => builder.add({
    instruction: mplAuctionHouse.createPrintListingReceiptInstruction({
      receipt,
      bookkeeper: bookkeeper.publicKey,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      receiptBump: receipt.bump
    }),
    signers: [bookkeeper],
    key: 'printListingReceipt'
  }));
};

exports.createListingBuilder = createListingBuilder;
exports.createListingOperation = createListingOperation;
exports.createListingOperationHandler = createListingOperationHandler;
//# sourceMappingURL=createListing.cjs.map
