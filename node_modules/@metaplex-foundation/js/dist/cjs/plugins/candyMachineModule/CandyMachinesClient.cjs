'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CandyMachinesBuildersClient = require('./CandyMachinesBuildersClient.cjs');
var createCandyMachine = require('./operations/createCandyMachine.cjs');
var deleteCandyMachine = require('./operations/deleteCandyMachine.cjs');
var findCandyMachinesByPublicKeyField = require('./operations/findCandyMachinesByPublicKeyField.cjs');
var findCandyMachineByAddress = require('./operations/findCandyMachineByAddress.cjs');
var findMintedNftsByCandyMachine = require('./operations/findMintedNftsByCandyMachine.cjs');
var insertItemsToCandyMachine = require('./operations/insertItemsToCandyMachine.cjs');
var mintCandyMachine = require('./operations/mintCandyMachine.cjs');
var updateCandyMachine = require('./operations/updateCandyMachine.cjs');
var PublicKey = require('../../types/PublicKey.cjs');

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
    return new CandyMachinesBuildersClient.CandyMachinesBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createCandyMachineOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createCandyMachine.createCandyMachineOperation(input));
  }
  /** {@inheritDoc deleteCandyMachineOperation} */


  delete(input) {
    return this.metaplex.operations().getTask(deleteCandyMachine.deleteCandyMachineOperation(input));
  }
  /** {@inheritDoc findCandyMachinesByPublicKeyFieldOperation} */


  findAllBy(input) {
    return this.metaplex.operations().getTask(findCandyMachinesByPublicKeyField.findCandyMachinesByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findCandyMachineByAddressOperation} */


  findByAddress(input) {
    return this.metaplex.operations().getTask(findCandyMachineByAddress.findCandyMachineByAddressOperation(input));
  }
  /** {@inheritDoc findMintedNftsByCandyMachineOperation} */


  findMintedNfts(input) {
    return this.metaplex.operations().getTask(findMintedNftsByCandyMachine.findMintedNftsByCandyMachineOperation(input));
  }
  /** {@inheritDoc insertItemsToCandyMachineOperation} */


  insertItems(input) {
    return this.metaplex.operations().getTask(insertItemsToCandyMachine.insertItemsToCandyMachineOperation(input));
  }
  /** {@inheritDoc mintCandyMachineOperation} */


  mint(input) {
    return this.metaplex.operations().getTask(mintCandyMachine.mintCandyMachineOperation(input));
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
      address: PublicKey.toPublicKey(candyMachine),
      ...input
    });
  }
  /** {@inheritDoc updateCandyMachineOperation} */


  update(input) {
    return this.metaplex.operations().getTask(updateCandyMachine.updateCandyMachineOperation(input));
  }

}

exports.CandyMachinesClient = CandyMachinesClient;
//# sourceMappingURL=CandyMachinesClient.cjs.map
