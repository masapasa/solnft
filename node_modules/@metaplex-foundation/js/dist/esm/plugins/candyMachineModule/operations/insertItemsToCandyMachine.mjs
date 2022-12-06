import { createAddConfigLinesInstruction } from '@metaplex-foundation/mpl-candy-machine';
import { assertNotFull, assertCanAdd, assertAllConfigLineConstraints } from '../asserts.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// -----------------
// Operation
// -----------------
const Key = 'InsertItemsToCandyMachineOperation';
/**
 * Insert items into an existing Candy Machine.
 *
 * ```ts
 * await metaplex
 *   .candyMachines()
 *   .insertItems({
 *     candyMachine,
 *     items: [
 *       { name: 'My NFT #1', uri: 'https://example.com/nft1' },
 *       { name: 'My NFT #2', uri: 'https://example.com/nft2' },
 *       { name: 'My NFT #3', uri: 'https://example.com/nft3' },
 *     ],
 *   })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const insertItemsToCandyMachineOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const InsertItemsToCandyMachineOperationHandler = {
  async handle(operation, metaplex) {
    return insertItemsToCandyMachineBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
  }

}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Insert items into an existing Candy Machine.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .candyMachines()
 *   .builders()
 *   .insertItems({ candyMachine, items });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const insertItemsToCandyMachineBuilder = (metaplex, params) => {
  var _params$authority, _params$index, _params$instructionKe;

  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : metaplex.identity();
  const index = (_params$index = params.index) !== null && _params$index !== void 0 ? _params$index : params.candyMachine.itemsLoaded;
  const items = params.items;
  assertNotFull(params.candyMachine, index);
  assertCanAdd(params.candyMachine, index, items.length);
  assertAllConfigLineConstraints(items);
  return TransactionBuilder.make().add({
    instruction: createAddConfigLinesInstruction({
      candyMachine: params.candyMachine.address,
      authority: authority.publicKey
    }, {
      index: index.toNumber(),
      configLines: items
    }),
    signers: [authority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'insertItems'
  });
};

export { InsertItemsToCandyMachineOperationHandler, insertItemsToCandyMachineBuilder, insertItemsToCandyMachineOperation };
//# sourceMappingURL=insertItemsToCandyMachine.mjs.map
