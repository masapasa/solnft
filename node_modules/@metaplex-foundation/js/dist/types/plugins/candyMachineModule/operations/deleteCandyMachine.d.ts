import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import type { ConfirmOptions } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine } from '../models/CandyMachine';
declare const Key: "DeleteCandyMachineOperation";
/**
 * Deletes an existing Candy Machine.
 *
 * ```ts
 * await metaplex.candyMachines().delete({ candyMachine }).run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const deleteCandyMachineOperation: import("../../../types").OperationConstructor<DeleteCandyMachineOperation, "DeleteCandyMachineOperation", DeleteCandyMachineInput, DeleteCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type DeleteCandyMachineOperation = Operation<typeof Key, DeleteCandyMachineInput, DeleteCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type DeleteCandyMachineInput = {
    /**
     * The Candy Machine to delete.
     * We need the address of the Candy Machine as well as the address
     * of the potential collection since we will need to delete the PDA account
     * that links the Candy Machine to the collection.
     *
     * If the Candy Machine does not have a collection, simply set
     * `collectionMintAddress` to `null`.
     */
    candyMachine: Pick<CandyMachine, 'address' | 'collectionMintAddress'>;
    /**
     * The Signer authorized to update the candy machine.
     *
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type DeleteCandyMachineOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const deleteCandyMachineOperationHandler: OperationHandler<DeleteCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type DeleteCandyMachineBuilderParams = Omit<DeleteCandyMachineInput, 'confirmOptions'> & {
    /** A key to distinguish the instruction that deletes the Candy Machine. */
    instructionKey?: string;
};
/**
 * Deletes an existing Candy Machine.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .candyMachines()
 *   .builders()
 *   .delete({
 *     candyMachine: { address, collectionMintAddress },
 *   });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const deleteCandyMachineBuilder: (metaplex: Metaplex, params: DeleteCandyMachineBuilderParams) => TransactionBuilder;
export {};
