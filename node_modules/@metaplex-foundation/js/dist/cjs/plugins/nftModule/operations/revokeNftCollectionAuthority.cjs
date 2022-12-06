'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'RevokeNftCollectionAuthorityOperation';
/**
 * Revokes an existing collection authority.
 *
 * ```ts
 * await metaplex
 *   .nfts()
 *   .revokeCollectionAuthority({ mintAddress, collectionAuthority })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const revokeNftCollectionAuthorityOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const revokeNftCollectionAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return revokeNftCollectionAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
  }
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Revokes an existing collection authority.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .nfts()
 *   .builders()
 *   .revokeCollectionAuthority({ mintAddress, collectionAuthority });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const revokeNftCollectionAuthorityBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    collectionAuthority,
    revokeAuthority = metaplex.identity()
  } = params;
  const metadata = pdas.findMetadataPda(mintAddress);
  const collectionAuthorityRecord = pdas.findCollectionAuthorityRecordPda(mintAddress, collectionAuthority);
  const instruction = mplTokenMetadata.createRevokeCollectionAuthorityInstruction({
    collectionAuthorityRecord,
    delegateAuthority: collectionAuthority,
    revokeAuthority: revokeAuthority.publicKey,
    metadata,
    mint: mintAddress
  }); // Temporary fix. The Shank macro wrongfully ask for the delegateAuthority to be a signer.
  // https://github.com/metaplex-foundation/metaplex-program-library/pull/639

  instruction.keys[1].isSigner = false;
  return TransactionBuilder.TransactionBuilder.make() // Revoke the collection authority.
  .add({
    instruction,
    signers: [revokeAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'revokeCollectionAuthority'
  });
};

exports.revokeNftCollectionAuthorityBuilder = revokeNftCollectionAuthorityBuilder;
exports.revokeNftCollectionAuthorityOperation = revokeNftCollectionAuthorityOperation;
exports.revokeNftCollectionAuthorityOperationHandler = revokeNftCollectionAuthorityOperationHandler;
//# sourceMappingURL=revokeNftCollectionAuthority.cjs.map
