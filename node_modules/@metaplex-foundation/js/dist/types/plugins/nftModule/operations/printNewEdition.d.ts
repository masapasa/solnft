import { Metaplex } from '../../../Metaplex';
import { BigNumber, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { NftWithToken } from '../models';
declare const Key: "PrintNewEditionOperation";
/**
 * Prints a new edition from an original NFT.
 *
 * ```ts
 * const { nft } = await metaplex
 *   .nfts()
 *   .printNewEdition({ originalMint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const printNewEditionOperation: import("../../../types").OperationConstructor<PrintNewEditionOperation, "PrintNewEditionOperation", PrintNewEditionInput, PrintNewEditionOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type PrintNewEditionOperation = Operation<typeof Key, PrintNewEditionInput, PrintNewEditionOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type PrintNewEditionInput = {
    /** The address of the original NFT. */
    originalMint: PublicKey;
    /**
     * The owner of the original NFT as a Signer.
     *
     * @defaultValue `metaplex.identity()`
     */
    originalTokenAccountOwner?: Signer;
    /**
     * The address of the original NFT's token account.
     *
     * @defaultValue Defaults to using the associated token account
     * from the `originalMint` and `originalTokenAccountOwner` parameters.
     */
    originalTokenAccount?: PublicKey;
    /**
     * The address of the new mint account as a Signer.
     * This is useful if you already have a generated Keypair
     * for the mint account of the Print NFT to create.
     *
     * @defaultValue `Keypair.generate()`
     */
    newMint?: Signer;
    /**
     * The update authority of the new printed NFT.
     *
     * Depending on your use-case, you might want to change that to
     * the `updateAuthority` of the original NFT.
     *
     * @defaultValue `metaplex.identity()`
     */
    newUpdateAuthority?: PublicKey;
    /**
     * The owner of the new printed NFT.
     *
     * @defaultValue `metaplex.identity().publicKey`
     */
    newOwner?: PublicKey;
    /**
     * The address of the new printed NFT's token account.
     *
     * @defaultValue Defaults to using the associated token account
     * from the `originalMint` and `newOwner` parameters.
     */
    newTokenAccount?: Signer;
    /**
     * The Signer paying for the creation of all accounts
     * required to create a new printed NFT.
     * This account will also pay for the transaction fee.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /** The address of the SPL Token program to override if necessary. */
    tokenProgram?: PublicKey;
    /** The address of the SPL Associated Token program to override if necessary. */
    associatedTokenProgram?: PublicKey;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type PrintNewEditionOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
    /** The newly created NFT and its associated token. */
    nft: NftWithToken;
    /** The created mint account as a Signer. */
    mintSigner: Signer;
    /** The address of the metadata account. */
    metadataAddress: PublicKey;
    /** The address of the edition account. */
    editionAddress: PublicKey;
    /** The address of the token account. */
    tokenAddress: PublicKey;
    /** The new supply of the original NFT. */
    updatedSupply: BigNumber;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const printNewEditionOperationHandler: OperationHandler<PrintNewEditionOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type PrintNewEditionBuilderParams = Omit<PrintNewEditionInput, 'confirmOptions'> & {
    /** The current supply of the original edition. */
    originalSupply: BigNumber;
    /** A key to distinguish the instruction that creates the mint account. */
    createMintAccountInstructionKey?: string;
    /** A key to distinguish the instruction that initializes the mint account. */
    initializeMintInstructionKey?: string;
    /** A key to distinguish the instruction that creates the associated token account. */
    createAssociatedTokenAccountInstructionKey?: string;
    /** A key to distinguish the instruction that creates the token account. */
    createTokenAccountInstructionKey?: string;
    /** A key to distinguish the instruction that initializes the token account. */
    initializeTokenInstructionKey?: string;
    /** A key to distinguish the instruction that mints tokens. */
    mintTokensInstructionKey?: string;
    /** A key to distinguish the instruction that prints the new edition. */
    printNewEditionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type PrintNewEditionBuilderContext = Omit<PrintNewEditionOutput, 'response' | 'nft'>;
/**
 * Prints a new edition from an original NFT.
 *
 * ```ts
 * const transactionBuilder = await metaplex
 *   .nfts()
 *   .builders()
 *   .printNewEdition({ originalMint });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const printNewEditionBuilder: (metaplex: Metaplex, params: PrintNewEditionBuilderParams) => Promise<TransactionBuilder<PrintNewEditionBuilderContext>>;
export {};
