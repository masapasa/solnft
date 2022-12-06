'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createCandyMachine = require('./operations/createCandyMachine.cjs');
var deleteCandyMachine = require('./operations/deleteCandyMachine.cjs');
var insertItemsToCandyMachine = require('./operations/insertItemsToCandyMachine.cjs');
var mintCandyMachine = require('./operations/mintCandyMachine.cjs');
var updateCandyMachine = require('./operations/updateCandyMachine.cjs');

/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the Candy Machine module.
 *
 * @see {@link CandyMachinesClient}
 * @group Module Builders
 */

class CandyMachinesBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /** {@inheritDoc createCandyMachineBuilder} */


  create(input) {
    return createCandyMachine.createCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc deleteCandyMachineBuilder} */


  delete(input) {
    return deleteCandyMachine.deleteCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc insertItemsToCandyMachineBuilder} */


  insertItems(input) {
    return insertItemsToCandyMachine.insertItemsToCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc mintCandyMachineBuilder} */


  mint(input) {
    return mintCandyMachine.mintCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc updateCandyMachineBuilder} */


  update(input) {
    return updateCandyMachine.updateCandyMachineBuilder(this.metaplex, input);
  }

}

exports.CandyMachinesBuildersClient = CandyMachinesBuildersClient;
//# sourceMappingURL=CandyMachinesBuildersClient.cjs.map
