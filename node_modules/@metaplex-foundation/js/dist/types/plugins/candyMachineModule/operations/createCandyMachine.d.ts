import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { Option, RequiredKeys, TransactionBuilder } from '../../../utils';
import { Creator } from '@metaplex-foundation/mpl-candy-machine';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineConfigs } from '../models/CandyMachine';
declare const Key: "CreateCandyMachineOperation";
/**
 * Creates a brand new Candy Machine.
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
 * @group Operations
 * @category Constructors
 */
export declare const createCandyMachineOperation: import("../../../types").OperationConstructor<CreateCandyMachineOperation, "CreateCandyMachineOperation", CreateCandyMachineInput, CreateCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateCandyMachineOperation = Operation<typeof Key, CreateCandyMachineInput, CreateCandyMachineOutput>;
export declare type CreateCandyMachineInputWithoutConfigs = {
    /**
     * The Candy Machine to create as a Signer.
     * This expects a brand new Keypair with no associated account.
     *
     * @defaultValue `Keypair.generate()`
     */
    candyMachine?: Signer;
    /**
     * The Signer that should pay for the creation of the Candy Machine.
     * This includes both storage fees and the transaction fee.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * The authority that will be allowed to update the Candy Machine.
     * Upon creation, passing the authority's public key is enough to set it.
     * However, when also passing a `collection` to this operation,
     * this authority will need to be passed as a Signer so the relevant
     * instruction can be signed.
     *
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer | PublicKey;
    /**
     * The mint address of the Collection NFT that all NFTs minted from
     * this Candy Machine should be part of.
     * When provided, the `authority` parameter will need to be passed as a `Signer`.
     * When `null`, minted NFTs won't be part of a collection.
     *
     * @defaultValue `null`
     */
    collection?: Option<PublicKey>;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateCandyMachineInput = CreateCandyMachineInputWithoutConfigs & RequiredKeys<Partial<CandyMachineConfigs>, 'price' | 'sellerFeeBasisPoints' | 'itemsAvailable'>;
/**
 * @group Operations
 * @category Outputs
 */
export declare type CreateCandyMachineOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
    /** The created Candy Machine. */
    candyMachine: CandyMachine;
    /** The create Candy Machine's account as a Signer. */
    candyMachineSigner: Signer;
    /** The account that ended up paying for the Candy Machine as a Signer. */
    payer: Signer;
    /** The created Candy Machine's wallet. */
    wallet: PublicKey;
    /** The created Candy Machine's authority. */
    authority: PublicKey;
    /** The created Candy Machine's creators. */
    creators: Creator[];
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createCandyMachineOperationHandler: OperationHandler<CreateCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateCandyMachineBuilderParams = Omit<CreateCandyMachineInput, 'confirmOptions'> & {
    /** A key to distinguish the instruction that creates the account. */
    createAccountInstructionKey?: string;
    /** A key to distinguish the instruction that initializes the Candy Machine. */
    initializeCandyMachineInstructionKey?: string;
    /** A key to distinguish the instruction that sets the collection. */
    setCollectionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateCandyMachineBuilderContext = Omit<CreateCandyMachineOutput, 'response' | 'candyMachine'>;
/**
 * Creates a brand new Candy Machine.
 *
 * ```ts
 * const transactionBuilder = await metaplex
 *   .candyMachines()
 *   .builders()
 *   .create({
 *     sellerFeeBasisPoints: 500, // 5% royalties
 *     price: sol(1.3), // 1.3 SOL
 *     itemsAvailable: toBigNumber(1000), // 1000 items available
 *   });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createCandyMachineBuilder: (metaplex: Metaplex, params: CreateCandyMachineBuilderParams) => Promise<TransactionBuilder<CreateCandyMachineBuilderContext>>;
export {};
