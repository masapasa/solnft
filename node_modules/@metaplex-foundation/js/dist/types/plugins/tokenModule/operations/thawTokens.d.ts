import type { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "ThawTokensOperation";
/**
 * Thaws a token account.
 *
 * ```ts
 * await metaplex.tokens().thaw({ mintAddress, freezeAuthority }).run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const thawTokensOperation: import("../../../types").OperationConstructor<ThawTokensOperation, "ThawTokensOperation", ThawTokensInput, ThawTokensOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ThawTokensOperation = Operation<typeof Key, ThawTokensInput, ThawTokensOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type ThawTokensInput = {
    /** The address of the mint account. */
    mintAddress: PublicKey;
    /**
     * The freeze authority as a Signer.
     *
     * This may be provided as a PublicKey if and only if
     * the `multiSigners` parameter is provided.
     */
    freezeAuthority: PublicKey | Signer;
    /**
     * The owner of the token account.
     *
     * @defaultValue `metaplex.identity().publicKey`
     */
    tokenOwner?: PublicKey;
    /**
     * The address of the token account.
     *
     * @defaultValue Defaults to using the associated token account
     * from the `mintAddress` and `tokenOwner` parameters.
     */
    tokenAddress?: PublicKey;
    /**
     * The signing accounts to use if the freeze authority is a multisig.
     *
     * @defaultValue `[]`
     */
    multiSigners?: KeypairSigner[];
    /** The address of the SPL Token program to override if necessary. */
    tokenProgram?: PublicKey;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type ThawTokensOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const thawTokensOperationHandler: OperationHandler<ThawTokensOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ThawTokensBuilderParams = Omit<ThawTokensInput, 'confirmOptions'> & {
    /** A key to distinguish the instruction that thaws the token account. */
    instructionKey?: string;
};
/**
 * Thaws a token account.
 *
 * ```ts
 * const transactionBuilder = metaplex.tokens().builders().thaw({ mintAddress, freezeAuthority });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const thawTokensBuilder: (metaplex: Metaplex, params: ThawTokensBuilderParams) => TransactionBuilder;
export {};
