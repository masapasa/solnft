import { CandyMachinesBuildersClient } from './CandyMachinesBuildersClient.mjs';
import { createCandyMachineOperation } from './operations/createCandyMachine.mjs';
import { deleteCandyMachineOperation } from './operations/deleteCandyMachine.mjs';
import { findCandyMachinesByPublicKeyFieldOperation } from './operations/findCandyMachinesByPublicKeyField.mjs';
import { findCandyMachineByAddressOperation } from './operations/findCandyMachineByAddress.mjs';
import { findMintedNftsByCandyMachineOperation } from './operations/findMintedNftsByCandyMachine.mjs';
import { insertItemsToCandyMachineOperation } from './operations/insertItemsToCandyMachine.mjs';
import { mintCandyMachineOperation } from './operations/mintCandyMachine.mjs';
import { updateCandyMachineOperation } from './operations/updateCandyMachine.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';

/**
 * This is a client for the Candy Machine module.
 *
 * It enables us to interact with the Candy Machine program in order to
 * create, update and delete Candy Machines as well as mint from them.
 *
 * You may access this client via the `candyMachines()` method of your `Metaplex` instance.
 *
 * ```ts
 * const candyMachineClient = metaplex.candyMachines();
 * ```
 *
 * @example
 * You can create a new Candy Machine with minimum input like so.
 * By default, the current identity of the Metaplex instance will be
 * the authority of the Candy Machine.
 *
 * ```ts
 * const { candyMachine } = await metaplex
 *   .candyMachines()
 *   .create({
 *     sellerFeeBasisPoints: 500, // 5% royalties
 *     price: sol(1.3), // 1.3 SOL
 *     itemsAvailable: toBigNumber(1000), // 1000 items available
 *   })
 *   .run();
 * ```
 *
 * @see {@link CandyMachine} The `CandyMachine` model
 * @group Modules
 */

class CandyMachinesClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /**
   * You may use the `builders()` client to access the
   * underlying Transaction Builders of this module.
   *
   * ```ts
   * const buildersClient = metaplex.candyMachines().builders();
   * ```
   */


  builders() {
    return new CandyMachinesBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createCandyMachineOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createCandyMachineOperation(input));
  }
  /** {@inheritDoc deleteCandyMachineOperation} */


  delete(input) {
    return this.metaplex.operations().getTask(deleteCandyMachineOperation(input));
  }
  /** {@inheritDoc findCandyMachinesByPublicKeyFieldOperation} */


  findAllBy(input) {
    return this.metaplex.operations().getTask(findCandyMachinesByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findCandyMachineByAddressOperation} */


  findByAddress(input) {
    return this.metaplex.operations().getTask(findCandyMachineByAddressOperation(input));
  }
  /** {@inheritDoc findMintedNftsByCandyMachineOperation} */


  findMintedNfts(input) {
    return this.metaplex.operations().getTask(findMintedNftsByCandyMachineOperation(input));
  }
  /** {@inheritDoc insertItemsToCandyMachineOperation} */


  insertItems(input) {
    return this.metaplex.operations().getTask(insertItemsToCandyMachineOperation(input));
  }
  /** {@inheritDoc mintCandyMachineOperation} */


  mint(input) {
    return this.metaplex.operations().getTask(mintCandyMachineOperation(input));
  }
  /**
   * Helper method that refetches a given Candy Machine.
   *
   * ```ts
   * const candyMachine = await metaplex.candyMachines().refresh(candyMachine).run();
   * ```
   */


  refresh(candyMachine, input) {
    return this.findByAddress({
      address: toPublicKey(candyMachine),
      ...input
    });
  }
  /** {@inheritDoc updateCandyMachineOperation} */


  update(input) {
    return this.metaplex.operations().getTask(updateCandyMachineOperation(input));
  }

}

export { CandyMachinesClient };
//# sourceMappingURL=CandyMachinesClient.mjs.map
