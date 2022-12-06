import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "RevokeNftUseAuthorityOperation";
/**
 * Revokes an existing use authority.
 *
 * ```ts
 * await metaplex
 *   .nfts()
 *   .revokeUseAuthority({ mintAddress, user })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const revokeNftUseAuthorityOperation: import("../../../types").OperationConstructor<RevokeNftUseAuthorityOperation, "RevokeNftUseAuthorityOperation", RevokeNftUseAuthorityInput, RevokeNftUseAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type RevokeNftUseAuthorityOperation = Operation<typeof Key, RevokeNftUseAuthorityInput, RevokeNftUseAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type RevokeNftUseAuthorityInput = {
    /** The address of the mint account. */
    mintAddress: PublicKey;
    /** The address of the use authority to revoke. */
    user: PublicKey;
    /**
     * The owner of the NFT or SFT as a Signer.
     *
     * @defaultValue `metaplex.identity()`
     */
    owner?: Signer;
    /**
     * The address of the token account linking the mint account
     * with the owner account.
     *
     * @defaultValue Defaults to using the associated token account
     * from the `mintAddress` and `owner` parameters.
     */
    ownerTokenAddress?: PublicKey;
    /** The address of the SPL Token program to override if necessary. */
    tokenProgram?: PublicKey;
    /** The address of the SPL System program to override if necessary. */
    systemProgram?: PublicKey;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type RevokeNftUseAuthorityOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const revokeNftUseAuthorityOperationHandler: OperationHandler<RevokeNftUseAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type RevokeNftUseAuthorityBuilderParams = Omit<RevokeNftUseAuthorityInput, 'confirmOptions'> & {
    /** A key to distinguish the instruction that revokes the use authority. */
    instructionKey?: string;
};
/**
 * Revokes an existing use authority.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .nfts()
 *   .builders()
 *   .revokeUseAuthority({ mintAddress, user });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const revokeNftUseAuthorityBuilder: (metaplex: Metaplex, params: RevokeNftUseAuthorityBuilderParams) => TransactionBuilder;
export {};
