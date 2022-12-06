'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var program = require('../program.cjs');
var accounts = require('../accounts.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var Operation = require('../../../types/Operation.cjs');
var pdas = require('../../nftModule/pdas.cjs');
var Bid = require('../models/Bid.cjs');

// Operation
// -----------------

const Key = 'FindBidsByPublicKeyOperation';
/**
 * Finds multiple Bids by specific criteria.
 *
 * ```ts
 * // Find bids by buyer.
 * const bids = await metaplex
 *   .auctionHouse()
 *   .findBidsBy({ auctionHouse, type: 'buyer', publicKey: buyer })
 *   .run();
 *
 * // Find bids by metadata.
 * const bids = await metaplex
 *   .auctionHouse()
 *   .findBidsBy({ auctionHouse, type: 'metadata', publicKey: metadata })
 *   .run();
 *
 * // Find bids by mint.
 * const bids = await metaplex
 *   .auctionHouse()
 *   .findBidsBy({ auctionHouse, type: 'mint', publicKey: mint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findBidsByPublicKeyFieldOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findBidsByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      auctionHouse,
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts$1 = program.AuctionHouseProgram.bidAccounts(metaplex).mergeConfig({
      commitment
    });
    let bidQuery = accounts$1.whereAuctionHouse(auctionHouse.address);

    switch (type) {
      case 'buyer':
        bidQuery = bidQuery.whereBuyer(publicKey);
        break;

      case 'metadata':
        bidQuery = bidQuery.whereMetadata(publicKey);
        break;

      case 'mint':
        bidQuery = bidQuery.whereMetadata(pdas.findMetadataPda(publicKey));
        break;

      default:
        throw new SdkError.UnreachableCaseError(type);
    }

    scope.throwIfCanceled();
    return bidQuery.getAndMap(account => Bid.toLazyBid(accounts.toBidReceiptAccount(account), auctionHouse));
  }
};

exports.findBidsByPublicKeyFieldOperation = findBidsByPublicKeyFieldOperation;
exports.findBidsByPublicKeyFieldOperationHandler = findBidsByPublicKeyFieldOperationHandler;
//# sourceMappingURL=findBidsByPublicKeyField.cjs.map
