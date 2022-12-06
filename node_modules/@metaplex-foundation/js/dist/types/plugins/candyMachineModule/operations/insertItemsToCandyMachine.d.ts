import { Metaplex } from '../../../Metaplex';
import { BigNumber, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import type { ConfirmOptions } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineItem } from '../models/CandyMachine';
declare const Key: "InsertItemsToCandyMachineOperation";
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
export declare const insertItemsToCandyMachineOperation: import("../../../types").OperationConstructor<InsertItemsToCandyMachineOperation, "InsertItemsToCandyMachineOperation", InsertItemsToCandyMachineInput, InsertItemsToCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type InsertItemsToCandyMachineOperation = Operation<typeof Key, InsertItemsToCandyMachineInput, InsertItemsToCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type InsertItemsToCandyMachineInput = {
    /**
     * The Candy Machine to insert items into.
     *
     * We only need a subset of the `CandyMachine` model.
     * We need its address and the number of items loaded and to be loaded
     * so we can check if the operation is valid.
     */
    candyMachine: Pick<CandyMachine, 'itemsAvailable' | 'itemsLoaded' | 'address'>;
    /**
     * The Signer authorized to update the candy machine.
     *
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer;
    /**
     * The items to insert into the candy machine.
     */
    items: CandyMachineItem[];
    /**
     * The index we should use to insert the new items. This refers to the
     * index of the first item to insert and the others will follow after it.
     *
     * By defaults, this uses the `itemsLoaded` property so items are simply
     * appended to the current items.
     *
     * @defaultValue `candyMachine.itemsLoaded`
     */
    index?: BigNumber;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type InsertItemsToCandyMachineOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const InsertItemsToCandyMachineOperationHandler: OperationHandler<InsertItemsToCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type InsertItemsToCandyMachineBuilderParams = Omit<InsertItemsToCandyMachineInput, 'confirmOptions'> & {
    instructionKey?: string;
};
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
export declare const insertItemsToCandyMachineBuilder: (metaplex: Metaplex, params: InsertItemsToCandyMachineBuilderParams) => TransactionBuilder;
export {};
