import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { NftWithToken, SftWithToken } from '../models';
declare const Key: "FindNftByTokenOperation";
/**
 * Finds an NFT or an SFT by its token address.
 *
 * ```ts
 * const nft = await metaplex
 *   .nfts()
 *   .findByToken({ token })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findNftByTokenOperation: import("../../../types").OperationConstructor<FindNftByTokenOperation, "FindNftByTokenOperation", FindNftByTokenInput, SftWithToken | NftWithToken>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftByTokenOperation = Operation<typeof Key, FindNftByTokenInput, FindNftByTokenOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftByTokenInput = {
    /** The address of the token account. */
    token: PublicKey;
    /**
     * Whether or not we should fetch the JSON Metadata for the NFT or SFT.
     *
     * @defaultValue `true`
     */
    loadJsonMetadata?: boolean;
    /** The level of commitment desired when querying the blockchain. */
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftByTokenOutput = NftWithToken | SftWithToken;
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftByTokenOperationHandler: OperationHandler<FindNftByTokenOperation>;
export {};
