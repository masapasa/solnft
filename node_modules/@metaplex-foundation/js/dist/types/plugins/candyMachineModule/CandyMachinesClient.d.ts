import type { Metaplex } from '../../Metaplex';
import { Task } from '../../utils';
import type { PublicKey } from '@solana/web3.js';
import { CandyMachinesBuildersClient } from './CandyMachinesBuildersClient';
import { CandyMachine } from './models';
import { CreateCandyMachineInput, DeleteCandyMachineInput, FindCandyMachineByAddressInput, FindCandyMachinesByPublicKeyFieldInput, FindMintedNftsByCandyMachineInput, InsertItemsToCandyMachineInput, MintCandyMachineInput, UpdateCandyMachineInput } from './operations';
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
export declare class CandyMachinesClient {
    readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /**
     * You may use the `builders()` client to access the
     * underlying Transaction Builders of this module.
     *
     * ```ts
     * const buildersClient = metaplex.candyMachines().builders();
     * ```
     */
    builders(): CandyMachinesBuildersClient;
    /** {@inheritDoc createCandyMachineOperation} */
    create(input: CreateCandyMachineInput): Task<import("./operations").CreateCandyMachineOutput, []>;
    /** {@inheritDoc deleteCandyMachineOperation} */
    delete(input: DeleteCandyMachineInput): Task<import("./operations").DeleteCandyMachineOutput, []>;
    /** {@inheritDoc findCandyMachinesByPublicKeyFieldOperation} */
    findAllBy(input: FindCandyMachinesByPublicKeyFieldInput): Task<CandyMachine[], []>;
    /** {@inheritDoc findCandyMachineByAddressOperation} */
    findByAddress(input: FindCandyMachineByAddressInput): Task<CandyMachine>;
    /** {@inheritDoc findMintedNftsByCandyMachineOperation} */
    findMintedNfts(input: FindMintedNftsByCandyMachineInput): Task<import("./operations").FindMintedNftsByCandyMachineOutput, []>;
    /** {@inheritDoc insertItemsToCandyMachineOperation} */
    insertItems(input: InsertItemsToCandyMachineInput): Task<import("./operations").InsertItemsToCandyMachineOutput, []>;
    /** {@inheritDoc mintCandyMachineOperation} */
    mint(input: MintCandyMachineInput): Task<import("./operations").MintCandyMachineOutput, []>;
    /**
     * Helper method that refetches a given Candy Machine.
     *
     * ```ts
     * const candyMachine = await metaplex.candyMachines().refresh(candyMachine).run();
     * ```
     */
    refresh(candyMachine: CandyMachine | PublicKey, input?: Omit<FindCandyMachineByAddressInput, 'address'>): Task<CandyMachine>;
    /** {@inheritDoc updateCandyMachineOperation} */
    update(input: UpdateCandyMachineInput): Task<import("./operations").UpdateCandyMachineOutput, []>;
}
