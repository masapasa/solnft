import { createCandyMachineBuilder } from './operations/createCandyMachine.mjs';
import { deleteCandyMachineBuilder } from './operations/deleteCandyMachine.mjs';
import { insertItemsToCandyMachineBuilder } from './operations/insertItemsToCandyMachine.mjs';
import { mintCandyMachineBuilder } from './operations/mintCandyMachine.mjs';
import { updateCandyMachineBuilder } from './operations/updateCandyMachine.mjs';

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
    return createCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc deleteCandyMachineBuilder} */


  delete(input) {
    return deleteCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc insertItemsToCandyMachineBuilder} */


  insertItems(input) {
    return insertItemsToCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc mintCandyMachineBuilder} */


  mint(input) {
    return mintCandyMachineBuilder(this.metaplex, input);
  }
  /** {@inheritDoc updateCandyMachineBuilder} */


  update(input) {
    return updateCandyMachineBuilder(this.metaplex, input);
  }

}

export { CandyMachinesBuildersClient };
//# sourceMappingURL=CandyMachinesBuildersClient.mjs.map
