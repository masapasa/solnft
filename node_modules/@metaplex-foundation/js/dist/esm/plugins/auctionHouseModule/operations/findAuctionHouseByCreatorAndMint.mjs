import { findAuctionHousePda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// -----------------
// Operation
// -----------------
const Key = 'FindAuctionHouseByCreatorAndMintOperation';
/**
 * Finds an Auction House by its creator and treasury mint.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findByCreatorAndMint({ creator, treasuryMint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findAuctionHouseByCreatorAndMintOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findAuctionHouseByCreatorAndMintOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      creator,
      treasuryMint
    } = operation.input;
    return metaplex.auctionHouse().findByAddress({
      address: findAuctionHousePda(creator, treasuryMint),
      ...operation.input
    }).run();
  }
};

export { findAuctionHouseByCreatorAndMintOperation, findAuctionHouseByCreatorAndMintOperationHandler };
//# sourceMappingURL=findAuctionHouseByCreatorAndMint.mjs.map
