import { createSetCollectionSizeInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findCollectionAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

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

const migrateToSizedCollectionNftOperation = useOperation(Key);
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
  return TransactionBuilder.make() // Update the metadata account.
  .add({
    instruction: createSetCollectionSizeInstruction({
      collectionMetadata: findMetadataPda(mintAddress),
      collectionAuthority: collectionAuthority.publicKey,
      collectionMint: mintAddress,
      collectionAuthorityRecord: isDelegated ? findCollectionAuthorityRecordPda(mintAddress, collectionAuthority.publicKey) : undefined
    }, {
      setCollectionSizeArgs: {
        size
      }
    }),
    signers: [collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'setCollectionSize'
  });
};

export { migrateToSizedCollectionNftBuilder, migrateToSizedCollectionNftOperation, migrateToSizedCollectionNftOperationHandler };
//# sourceMappingURL=migrateToSizedCollectionNft.mjs.map
