import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { createSellInstruction, createAuctioneerSellInstruction, createPrintListingReceiptInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHouseTradeStatePda, findAuctionHouseProgramAsSignerPda, findAuctioneerPda, findListingReceiptPda } from '../pdas.mjs';
import { AUCTIONEER_PRICE } from '../constants.mjs';
import { AuctioneerAuthorityRequiredError, CreateListingRequiresSignerError } from '../errors.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { now } from '../../../types/DateTime.mjs';
import { token, lamports, amount } from '../../../types/Amount.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { findMetadataPda } from '../../nftModule/pdas.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

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

const createListingOperation = useOperation(Key);
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
      createdAt: now(),
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
    tokens = token(1),
    seller = metaplex.identity(),
    authority = auctionHouse.authorityAddress
  } = params; // Data.

  const priceBasisPoint = auctioneerAuthority ? AUCTIONEER_PRICE : (_params$price$basisPo = (_params$price = params.price) === null || _params$price === void 0 ? void 0 : _params$price.basisPoints) !== null && _params$price$basisPo !== void 0 ? _params$price$basisPo : 0;
  const price = auctionHouse.isNative ? lamports(priceBasisPoint) : amount(priceBasisPoint, auctionHouse.treasuryMint.currency);

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new AuctioneerAuthorityRequiredError();
  }

  if (!isSigner(seller) && !isSigner(authority)) {
    throw new CreateListingRequiresSignerError();
  } // Accounts.


  const metadata = findMetadataPda(mintAccount);
  const tokenAccount = (_params$tokenAccount = params.tokenAccount) !== null && _params$tokenAccount !== void 0 ? _params$tokenAccount : findAssociatedTokenAccountPda(mintAccount, toPublicKey(seller));
  const sellerTradeState = findAuctionHouseTradeStatePda(auctionHouse.address, toPublicKey(seller), auctionHouse.treasuryMint.address, mintAccount, price.basisPoints, tokens.basisPoints, tokenAccount);
  const freeSellerTradeState = findAuctionHouseTradeStatePda(auctionHouse.address, toPublicKey(seller), auctionHouse.treasuryMint.address, mintAccount, lamports(0).basisPoints, tokens.basisPoints, tokenAccount);
  const programAsSigner = findAuctionHouseProgramAsSignerPda();
  const accounts = {
    wallet: toPublicKey(seller),
    tokenAccount,
    metadata,
    authority: toPublicKey(authority),
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

  let sellInstruction = createSellInstruction(accounts, args);

  if (auctioneerAuthority) {
    sellInstruction = createAuctioneerSellInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const signer = isSigner(seller) ? seller : authority;
  const sellSigners = [signer, auctioneerAuthority].filter(isSigner); // Update the account to be a signer since it's not covered properly by MPL due to its dynamic nature.

  const signerKeyIndex = sellInstruction.keys.findIndex(key => key.pubkey.equals(signer.publicKey));
  sellInstruction.keys[signerKeyIndex].isSigner = true; // Receipt.
  // Since createPrintListingReceiptInstruction can't deserialize createAuctioneerSellInstruction due to a bug
  // Don't print Auctioneer Sell receipt for the time being.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && !auctioneerAuthority;
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const receipt = findListingReceiptPda(sellerTradeState);
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    sellerTradeState,
    freeSellerTradeState,
    tokenAccount,
    metadata,
    seller: toPublicKey(seller),
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
    instruction: createPrintListingReceiptInstruction({
      receipt,
      bookkeeper: bookkeeper.publicKey,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      receiptBump: receipt.bump
    }),
    signers: [bookkeeper],
    key: 'printListingReceipt'
  }));
};

export { createListingBuilder, createListingOperation, createListingOperationHandler };
//# sourceMappingURL=createListing.mjs.map
