import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { CandyMachine } from '../models/CandyMachine';
declare const Key: "FindCandyMachinesByPublicKeyOperation";
/**
 * Find all Candy Machines matching by a given `publicKey` or a given `type`.
 *
 * The following two types are supported.
 *
 * `authority`: Find Candy Machines whose authority is the given `publicKey`.
 * ```ts
 * const someAuthority = new PublicKey('...');
 * const candyMachines = await metaplex
 *   .candyMachines()
 *   .findAllBy({ type: 'authority', someAuthority });
 *   .run();
 * ```
 *
 * `wallet`: Find Candy Machines whose wallet address is the given `publicKey`.
 * ```ts
 * const someWallet = new PublicKey('...');
 * const candyMachines = await metaplex
 *   .candyMachines()
 *   .findAllBy({ type: 'wallet', someWallet });
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findCandyMachinesByPublicKeyFieldOperation: import("../../../types").OperationConstructor<FindCandyMachinesByPublicKeyFieldOperation, "FindCandyMachinesByPublicKeyOperation", FindCandyMachinesByPublicKeyFieldInput, CandyMachine[]>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindCandyMachinesByPublicKeyFieldOperation = Operation<typeof Key, FindCandyMachinesByPublicKeyFieldInput, CandyMachine[]>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindCandyMachinesByPublicKeyFieldInput = {
    /** Defines which type of account the `publicKey` field refers to.  */
    type: 'authority' | 'wallet';
    /** The publicKey to filter Candy Machine by. */
    publicKey: PublicKey;
    /** The level of commitment desired when querying the blockchain. */
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findCandyMachinesByPublicKeyFieldOperationHandler: OperationHandler<FindCandyMachinesByPublicKeyFieldOperation>;
export {};
