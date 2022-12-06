import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { CandyMachineData } from '@metaplex-foundation/mpl-candy-machine';
import type { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineConfigs } from '../models/CandyMachine';
declare const Key: "UpdateCandyMachineOperation";
/**
 * Updates an existing Candy Machine.
 *
 * ```ts
 * await metaplex
 *   .candyMachines()
 *   .update({
 *     candyMachine,
 *     price: sol(2), // Updates the price only.
 *   })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const updateCandyMachineOperation: import("../../../types").OperationConstructor<UpdateCandyMachineOperation, "UpdateCandyMachineOperation", UpdateCandyMachineInput, UpdateCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UpdateCandyMachineOperation = Operation<typeof Key, UpdateCandyMachineInput, UpdateCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UpdateCandyMachineInput = Partial<CandyMachineConfigs> & {
    /**
     * The Candy Machine to update.
     * We need the full model in order to compare the current data with
     * the provided data to update. For instance, if you only want to
     * update the `price`, we need to send an instruction that updates
     * the data whilst keeping all other properties the same.
     *
     * If you want more control over how this transaction is built,
     * you may use the associated transaction builder instead using
     * `metaplex.candyMachines().builders().updateCandyMachine({...})`.
     */
    candyMachine: CandyMachine;
    /**
     * The Signer authorized to update the candy machine.
     *
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer;
    /**
     * The Signer that should pay for any required account storage.
     * E.g. for the collection PDA that keeps track of the Candy Machine's collection.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * The new Candy Machine authority.
     *
     * @defaultValue Defaults to not being updated.
     */
    newAuthority?: PublicKey;
    /**
     * The mint address of the new Candy Machine collection.
     * When `null` is provided, the collection is removed.
     *
     * @defaultValue Defaults to not being updated.
     */
    newCollection?: Option<PublicKey>;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UpdateCandyMachineOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const updateCandyMachineOperationHandler: OperationHandler<UpdateCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UpdateCandyMachineBuilderParams = {
    /**
     * The Candy Machine to update.
     * We only need a subset of the `CandyMachine` model to figure out
     * the current values for the wallet and collection addresses.
     */
    candyMachine: Pick<CandyMachine, 'address' | 'walletAddress' | 'collectionMintAddress'>;
    /**
     * The Signer authorized to update the candy machine.
     *
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer;
    /**
     * The Signer that should pay for any required account storage.
     * E.g. for the collection PDA that keeps track of the Candy Machine's collection.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * The new Candy Machine data.
     * This includes the wallet and token mint addresses
     * which can both be updated.
     *
     * @defaultValue Defaults to not being updated.
     */
    newData?: CandyMachineData & {
        wallet: PublicKey;
        tokenMint: Option<PublicKey>;
    };
    /**
     * The new Candy Machine authority.
     *
     * @defaultValue Defaults to not being updated.
     */
    newAuthority?: PublicKey;
    /**
     * The mint address of the new Candy Machine collection.
     * When `null` is provided, the collection is removed.
     *
     * @defaultValue Defaults to not being updated.
     */
    newCollection?: Option<PublicKey>;
    /** A key to distinguish the instruction that updates the data. */
    updateInstructionKey?: string;
    /** A key to distinguish the instruction that updates the authority. */
    updateAuthorityInstructionKey?: string;
    /** A key to distinguish the instruction that sets the collection. */
    setCollectionInstructionKey?: string;
    /** A key to distinguish the instruction that removes the collection. */
    removeCollectionInstructionKey?: string;
};
/**
 * Updates an existing Candy Machine.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .candyMachines()
 *   .builders()
 *   .update({
 *     candyMachine: { address, walletAddress, collectionMintAddress },
 *     newData: {...}, // Updates the provided data.
 *   });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const updateCandyMachineBuilder: (metaplex: Metaplex, params: UpdateCandyMachineBuilderParams) => TransactionBuilder;
export {};
