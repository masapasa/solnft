'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var program = require('../program.cjs');
var accounts = require('../accounts.cjs');
var Operation = require('../../../types/Operation.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var pdas = require('../../nftModule/pdas.cjs');
var Purchase = require('../models/Purchase.cjs');

// Operation
// -----------------

const Key = 'FindPurchasesByPublicKeyOperation';
/**
 * Finds multiple Purchases by specific criteria.
 *
 * ```ts
 * // Find purchases by seller.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'seller', publicKey: seller })
 *   .run();
 *
 * // Find purchases by buyer.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'buyer', publicKey: buyer })
 *   .run();
 *
 * // Find purchases by metadata.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'metadata', publicKey: metadata })
 *   .run();
 *
 * // Find purchases by mint.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'mint', publicKey: mint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findPurchasesByPublicKeyFieldOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findPurchasesByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      auctionHouse,
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts$1 = program.AuctionHouseProgram.purchaseAccounts(metaplex).mergeConfig({
      commitment
    });
    let purchaseQuery = accounts$1.whereAuctionHouse(auctionHouse.address);

    switch (type) {
      case 'buyer':
        purchaseQuery = purchaseQuery.whereBuyer(publicKey);
        break;

      case 'seller':
        purchaseQuery = purchaseQuery.whereSeller(publicKey);
        break;

      case 'metadata':
        purchaseQuery = purchaseQuery.whereMetadata(publicKey);
        break;

      case 'mint':
        purchaseQuery = purchaseQuery.whereMetadata(pdas.findMetadataPda(publicKey));
        break;

      default:
        throw new SdkError.UnreachableCaseError(type);
    }

    scope.throwIfCanceled();
    return purchaseQuery.getAndMap(account => Purchase.toLazyPurchase(accounts.toPurchaseReceiptAccount(account), auctionHouse));
  }
};

exports.findPurchasesByPublicKeyFieldOperation = findPurchasesByPublicKeyFieldOperation;
exports.findPurchasesByPublicKeyFieldOperationHandler = findPurchasesByPublicKeyFieldOperationHandler;
//# sourceMappingURL=findPurchasesByPublicKeyField.cjs.map
