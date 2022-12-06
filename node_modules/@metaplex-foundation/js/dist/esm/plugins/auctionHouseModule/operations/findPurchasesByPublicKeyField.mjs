import { AuctionHouseProgram } from '../program.mjs';
import { toPurchaseReceiptAccount } from '../accounts.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { UnreachableCaseError } from '../../../errors/SdkError.mjs';
import { findMetadataPda } from '../../nftModule/pdas.mjs';
import { toLazyPurchase } from '../models/Purchase.mjs';

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

const findPurchasesByPublicKeyFieldOperation = useOperation(Key);
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
    const accounts = AuctionHouseProgram.purchaseAccounts(metaplex).mergeConfig({
      commitment
    });
    let purchaseQuery = accounts.whereAuctionHouse(auctionHouse.address);

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
        purchaseQuery = purchaseQuery.whereMetadata(findMetadataPda(publicKey));
        break;

      default:
        throw new UnreachableCaseError(type);
    }

    scope.throwIfCanceled();
    return purchaseQuery.getAndMap(account => toLazyPurchase(toPurchaseReceiptAccount(account), auctionHouse));
  }
};

export { findPurchasesByPublicKeyFieldOperation, findPurchasesByPublicKeyFieldOperationHandler };
//# sourceMappingURL=findPurchasesByPublicKeyField.mjs.map
