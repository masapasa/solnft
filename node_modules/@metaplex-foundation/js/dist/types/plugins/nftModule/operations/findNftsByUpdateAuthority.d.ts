import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft, Sft } from '../models';
declare const Key: "FindNftsByUpdateAuthorityOperation";
/**
 * Finds multiple NFTs and SFTs by a given update authority.
 *
 * ```ts
 * const nfts = await metaplex
 *   .nfts()
 *   .findAllByUpdateAuthority({ updateAuthority })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findNftsByUpdateAuthorityOperation: import("../../../types").OperationConstructor<FindNftsByUpdateAuthorityOperation, "FindNftsByUpdateAuthorityOperation", FindNftsByUpdateAuthorityInput, FindNftsByUpdateAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftsByUpdateAuthorityOperation = Operation<typeof Key, FindNftsByUpdateAuthorityInput, FindNftsByUpdateAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftsByUpdateAuthorityInput = {
    /** The address of the update authority. */
    updateAuthority: PublicKey;
    /** The level of commitment desired when querying the blockchain. */
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftsByUpdateAuthorityOutput = (Metadata | Nft | Sft)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftsByUpdateAuthorityOperationHandler: OperationHandler<FindNftsByUpdateAuthorityOperation>;
export {};
