'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas$1 = require('../pdas.cjs');
var errors = require('../errors.cjs');
var Operation = require('../../../types/Operation.cjs');
var DateTime = require('../../../types/DateTime.cjs');
var Amount = require('../../../types/Amount.cjs');
var pdas = require('../../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Signer = require('../../../types/Signer.cjs');

// Operation
// -----------------

const Key = 'ExecuteSaleOperation';
/**
 * Executes a sale on a given bid and listing.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .executeSale({ auctionHouse, bid, listing })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const executeSaleOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * Executes a sale on a given bid and listing.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .executeSale({ auctionHouse, listing, bid });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const executeSaleOperationHandler = {
  async handle(operation, metaplex, scope) {
    const {
      auctionHouse
    } = operation.input;
    const output = await executeSaleBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();

    if (output.receipt) {
      const purchase = await metaplex.auctionHouse().findPurchaseByReceipt({
        auctionHouse,
        receiptAddress: output.receipt
      }).run(scope);
      return {
        purchase,
        ...output
      };
    }

    const lazyPurchase = {
      model: 'purchase',
      lazy: true,
      auctionHouse: operation.input.auctionHouse,
      buyerAddress: output.buyer,
      sellerAddress: output.seller,
      metadataAddress: output.metadata,
      bookkeeperAddress: output.bookkeeper,
      receiptAddress: output.receipt,
      price: output.price,
      tokens: output.tokens.basisPoints,
      createdAt: DateTime.now()
    };
    return {
      purchase: await metaplex.auctionHouse().loadPurchase({
        lazyPurchase
      }).run(scope),
      ...output
    };
  }

}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * @group Transaction Builders
 * @category Constructors
 */
const executeSaleBuilder = (metaplex, params) => {
  var _params$printReceipt, _params$bookkeeper, _params$instructionKe;

  const {
    auctionHouse,
    listing,
    bid,
    auctioneerAuthority
  } = params;
  const {
    sellerAddress,
    asset
  } = listing;
  const {
    buyerAddress
  } = bid;
  const {
    hasAuctioneer,
    isNative,
    treasuryMint,
    address: auctionHouseAddress,
    authorityAddress,
    feeAccountAddress,
    treasuryAccountAddress
  } = auctionHouse;
  const isPartialSale = bid.tokens.basisPoints < listing.tokens.basisPoints; // Use full size of listing & price when finding trade state PDA for the partial sale.

  const {
    tokens,
    price
  } = isPartialSale ? listing : bid;
  const {
    price: buyerPrice,
    tokens: buyerTokensSize
  } = bid;

  if (!listing.auctionHouse.address.equals(bid.auctionHouse.address)) {
    throw new errors.BidAndListingHaveDifferentAuctionHousesError();
  }

  if (!listing.asset.address.equals(bid.asset.address)) {
    throw new errors.BidAndListingHaveDifferentMintsError();
  }

  if (bid.canceledAt) {
    throw new errors.CanceledBidIsNotAllowedError();
  }

  if (listing.canceledAt) {
    throw new errors.CanceledListingIsNotAllowedError();
  }

  if (hasAuctioneer && !auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  }

  if (isPartialSale && hasAuctioneer) {
    throw new errors.AuctioneerPartialSaleNotSupportedError();
  }

  if (isPartialSale) {
    const listingPricePerToken = price.basisPoints.div(tokens.basisPoints);
    const buyerPricePerToken = buyerPrice.basisPoints.div(buyerTokensSize.basisPoints);

    if (!listingPricePerToken.eq(buyerPricePerToken)) {
      throw new errors.PartialPriceMismatchError(auctionHouse.isNative ? Amount.lamports(listingPricePerToken) : Amount.amount(listingPricePerToken, auctionHouse.treasuryMint.currency), auctionHouse.isNative ? Amount.lamports(buyerPricePerToken) : Amount.amount(buyerPricePerToken, auctionHouse.treasuryMint.currency));
    }
  } // Accounts.


  const sellerPaymentReceiptAccount = isNative ? sellerAddress : pdas.findAssociatedTokenAccountPda(treasuryMint.address, sellerAddress);
  const buyerReceiptTokenAccount = pdas.findAssociatedTokenAccountPda(asset.address, buyerAddress);
  const escrowPayment = pdas$1.findAuctionHouseBuyerEscrowPda(auctionHouseAddress, buyerAddress);
  const freeTradeState = pdas$1.findAuctionHouseTradeStatePda(auctionHouseAddress, sellerAddress, treasuryMint.address, asset.address, Amount.lamports(0).basisPoints, tokens.basisPoints, asset.token.address);
  const programAsSigner = pdas$1.findAuctionHouseProgramAsSignerPda();
  const accounts = {
    buyer: buyerAddress,
    seller: sellerAddress,
    tokenAccount: asset.token.address,
    tokenMint: asset.address,
    metadata: asset.metadataAddress,
    treasuryMint: treasuryMint.address,
    escrowPaymentAccount: escrowPayment,
    sellerPaymentReceiptAccount,
    buyerReceiptTokenAccount,
    authority: authorityAddress,
    auctionHouse: auctionHouseAddress,
    auctionHouseFeeAccount: feeAccountAddress,
    auctionHouseTreasury: treasuryAccountAddress,
    buyerTradeState: bid.tradeStateAddress,
    sellerTradeState: listing.tradeStateAddress,
    freeTradeState,
    programAsSigner
  }; // Args.

  const args = {
    freeTradeStateBump: freeTradeState.bump,
    escrowPaymentBump: escrowPayment.bump,
    programAsSignerBump: programAsSigner.bump,
    buyerPrice: price.basisPoints,
    tokenSize: tokens.basisPoints
  }; // Execute Sale Instruction

  const partialSaleArgs = { ...args,
    partialOrderSize: bid.tokens.basisPoints,
    partialOrderPrice: bid.price.basisPoints
  };
  let executeSaleInstruction = isPartialSale ? mplAuctionHouse.createExecutePartialSaleInstruction(accounts, partialSaleArgs) : mplAuctionHouse.createExecuteSaleInstruction(accounts, args);

  if (auctioneerAuthority) {
    const auctioneerAccounts = { ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: pdas$1.findAuctioneerPda(auctionHouseAddress, auctioneerAuthority.publicKey)
    };
    executeSaleInstruction = mplAuctionHouse.createAuctioneerExecuteSaleInstruction(auctioneerAccounts, args);
  } // Provide additional keys to pay royalties.


  asset.creators.forEach(({
    address
  }) => {
    executeSaleInstruction.keys.push({
      pubkey: address,
      isWritable: true,
      isSigner: false
    }); // Provide ATA to receive SPL token royalty if is not native SOL sale.

    if (!isNative) {
      executeSaleInstruction.keys.push({
        pubkey: pdas.findAssociatedTokenAccountPda(treasuryMint.address, address),
        isWritable: true,
        isSigner: false
      });
    }
  }); // Signers.

  const executeSaleSigners = [auctioneerAuthority].filter(Signer.isSigner); // Receipt.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && Boolean(listing.receiptAddress && bid.receiptAddress && !isPartialSale);
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const purchaseReceipt = pdas$1.findPurchaseReceiptPda(listing.tradeStateAddress, bid.tradeStateAddress);
  return TransactionBuilder.TransactionBuilder.make().setContext({
    sellerTradeState: listing.tradeStateAddress,
    buyerTradeState: bid.tradeStateAddress,
    buyer: buyerAddress,
    seller: sellerAddress,
    metadata: asset.metadataAddress,
    bookkeeper: shouldPrintReceipt ? bookkeeper.publicKey : null,
    receipt: shouldPrintReceipt ? purchaseReceipt : null,
    price,
    tokens
  }) // Execute Sale.
  .add({
    instruction: executeSaleInstruction,
    signers: executeSaleSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'executeSale'
  }) // Print the Purchase Receipt.
  .when(shouldPrintReceipt, builder => builder.add({
    instruction: mplAuctionHouse.createPrintPurchaseReceiptInstruction({
      purchaseReceipt: purchaseReceipt,
      listingReceipt: listing.receiptAddress,
      bidReceipt: bid.receiptAddress,
      bookkeeper: bookkeeper.publicKey,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      purchaseReceiptBump: purchaseReceipt.bump
    }),
    signers: [bookkeeper],
    key: 'printPurchaseReceipt'
  }));
};

exports.executeSaleBuilder = executeSaleBuilder;
exports.executeSaleOperation = executeSaleOperation;
exports.executeSaleOperationHandler = executeSaleOperationHandler;
//# sourceMappingURL=executeSale.cjs.map
