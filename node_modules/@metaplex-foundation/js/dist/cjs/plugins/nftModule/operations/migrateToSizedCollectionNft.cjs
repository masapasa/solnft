'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'MigrateToSizedCollectionNftOperation';
/**
 * Migrates a legacy Collection NFT to a sized Collection NFT.
 * Both can act as a Collection for NFTs but only the latter
 * keeps track of the size of the collection on chain.
 *
 * ```ts
 * await metaplex
 *   .nfts()
 *   .migrateToSizedCollection({ mintAddress, size: toBigNumber(10000) })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const migrateToSizedCollectionNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const migrateToSizedCollectionNftOperationHandler = {
  handle: async (operation, metaplex) => {
    return migrateToSizedCollectionNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
  }
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Migrates a legacy Collection NFT to a sized Collection NFT.
 * Both can act as a Collection for NFTs but only the latter
 * keeps track of the size of the collection on chain.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .nfts()
 *   .builders()
 *   .migrateToSizedCollection({ mintAddress, size: toBigNumber(10000) });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const migrateToSizedCollectionNftBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    collectionAuthority = metaplex.identity(),
    size,
    isDelegated = false
  } = params;
  return TransactionBuilder.TransactionBuilder.make() // Update the metadata account.
  .add({
    instruction: mplTokenMetadata.createSetCollectionSizeInstruction({
      collectionMetadata: pdas.findMetadataPda(mintAddress),
      collectionAuthority: collectionAuthority.publicKey,
      collectionMint: mintAddress,
      collectionAuthorityRecord: isDelegated ? pdas.findCollectionAuthorityRecordPda(mintAddress, collectionAuthority.publicKey) : undefined
    }, {
      setCollectionSizeArgs: {
        size
      }
    }),
    signers: [collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'setCollectionSize'
  });
};

exports.migrateToSizedCollectionNftBuilder = migrateToSizedCollectionNftBuilder;
exports.migrateToSizedCollectionNftOperation = migrateToSizedCollectionNftOperation;
exports.migrateToSizedCollectionNftOperationHandler = migrateToSizedCollectionNftOperationHandler;
//# sourceMappingURL=migrateToSizedCollectionNft.cjs.map
