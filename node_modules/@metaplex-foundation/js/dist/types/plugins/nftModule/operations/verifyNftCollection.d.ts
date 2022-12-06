import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "VerifyNftCollectionOperation";
/**
 * Verifies the collection of an NFT or SFT.
 *
 * ```ts
 * await metaplex
 *   .nfts()
 *   .verifyCollection({ mintAddress, collectionMintAddress })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const verifyNftCollectionOperation: import("../../../types").OperationConstructor<VerifyNftCollectionOperation, "VerifyNftCollectionOperation", VerifyNftCollectionInput, VerifyNftCollectionOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type VerifyNftCollectionOperation = Operation<typeof Key, VerifyNftCollectionInput, VerifyNftCollectionOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type VerifyNftCollectionInput = {
    /** The address of the mint account. */
    mintAddress: PublicKey;
    /** The mint address of the collection NFT. */
    collectionMintAddress: PublicKey;
    /**
     * An authority that can verify and unverify collection items
     * from the provided `collectionMintAddress`.
     *
     * @defaultValue `metaplex.identity()`
     */
    collectionAuthority?: Signer;
    /**
     * The Signer paying for the transaction fee.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * Whether or not the provided `collectionMintAddress` is a
     * sized collection (as opposed to a legacy collection).
     *
     * @defaultValue `true`
     */
    isSizedCollection?: boolean;
    /**
     * Whether or not the provided `collectionAuthority` is a delegated
     * collection authority, i.e. it was approved by the update authority
     * using `metaplex.nfts().approveCollectionAuthority()`.
     *
     * @defaultValue `false`
     */
    isDelegated?: boolean;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type VerifyNftCollectionOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const verifyNftCollectionOperationHandler: OperationHandler<VerifyNftCollectionOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type VerifyNftCollectionBuilderParams = Omit<VerifyNftCollectionInput, 'confirmOptions'> & {
    /** A key to distinguish the instruction that verifies the collection. */
    instructionKey?: string;
};
/**
 * Verifies the collection of an NFT or SFT.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .nfts()
 *   .builders()
 *   .verifyCollection({ mintAddress, collectionMintAddress });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const verifyNftCollectionBuilder: (metaplex: Metaplex, params: VerifyNftCollectionBuilderParams) => TransactionBuilder;
export {};
