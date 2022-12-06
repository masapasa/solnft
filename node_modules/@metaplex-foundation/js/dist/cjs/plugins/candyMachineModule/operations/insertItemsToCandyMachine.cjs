'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplCandyMachine = require('@metaplex-foundation/mpl-candy-machine');
var asserts = require('../asserts.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

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

const insertItemsToCandyMachineOperation = Operation.useOperation(Key);
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
  asserts.assertNotFull(params.candyMachine, index);
  asserts.assertCanAdd(params.candyMachine, index, items.length);
  asserts.assertAllConfigLineConstraints(items);
  return TransactionBuilder.TransactionBuilder.make().add({
    instruction: mplCandyMachine.createAddConfigLinesInstruction({
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

exports.InsertItemsToCandyMachineOperationHandler = InsertItemsToCandyMachineOperationHandler;
exports.insertItemsToCandyMachineBuilder = insertItemsToCandyMachineBuilder;
exports.insertItemsToCandyMachineOperation = insertItemsToCandyMachineOperation;
//# sourceMappingURL=insertItemsToCandyMachine.cjs.map
