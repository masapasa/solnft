'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var program = require('../program.cjs');
var accounts = require('../accounts.cjs');
var Operation = require('../../../types/Operation.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var pdas = require('../../nftModule/pdas.cjs');
var Listing = require('../models/Listing.cjs');

// Operation
// -----------------

const Key = 'FindListingsByPublicKeyOperation';
/**
 * Finds multiple Listings by specific criteria.
 *
 * ```ts
 * // Find listings by seller.
 * const listings = await metaplex
 *   .auctionHouse()
 *   .findListingsBy({ auctionHouse, type: 'seller', publicKey: seller })
 *   .run();
 *
 * // Find listings by metadata.
 * const listings = await metaplex
 *   .auctionHouse()
 *   .findListingsBy({ auctionHouse, type: 'metadata', publicKey: metadata })
 *   .run();
 *
 * // Find listings by mint.
 * const listings = await metaplex
 *   .auctionHouse()
 *   .findListingsBy({ auctionHouse, type: 'mint', publicKey: mint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findListingsByPublicKeyFieldOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findListingsByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      auctionHouse,
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts$1 = program.AuctionHouseProgram.listingAccounts(metaplex).mergeConfig({
      commitment
    });
    let listingQuery = accounts$1.whereAuctionHouse(auctionHouse.address);

    switch (type) {
      case 'seller':
        listingQuery = listingQuery.whereSeller(publicKey);
        break;

      case 'metadata':
        listingQuery = listingQuery.whereMetadata(publicKey);
        break;

      case 'mint':
        listingQuery = listingQuery.whereMetadata(pdas.findMetadataPda(publicKey));
        break;

      default:
        throw new SdkError.UnreachableCaseError(type);
    }

    scope.throwIfCanceled();
    return listingQuery.getAndMap(account => Listing.toLazyListing(accounts.toListingReceiptAccount(account), auctionHouse));
  }
};

exports.findListingsByPublicKeyFieldOperation = findListingsByPublicKeyFieldOperation;
exports.findListingsByPublicKeyFieldOperationHandler = findListingsByPublicKeyFieldOperationHandler;
//# sourceMappingURL=findListingsByPublicKeyField.cjs.map
