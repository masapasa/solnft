'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');

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

const findAuctionHouseByCreatorAndMintOperation = Operation.useOperation(Key);
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
      address: pdas.findAuctionHousePda(creator, treasuryMint),
      ...operation.input
    }).run();
  }
};

exports.findAuctionHouseByCreatorAndMintOperation = findAuctionHouseByCreatorAndMintOperation;
exports.findAuctionHouseByCreatorAndMintOperationHandler = findAuctionHouseByCreatorAndMintOperationHandler;
//# sourceMappingURL=findAuctionHouseByCreatorAndMint.cjs.map
