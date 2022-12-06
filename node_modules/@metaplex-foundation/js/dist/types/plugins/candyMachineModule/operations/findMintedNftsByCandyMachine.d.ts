import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft } from '../../nftModule';
declare const Key: "FindMintedNftsByCandyMachineOperation";
/**
 * Find all minted NFTs from a given Candy Machine address.
 *
 * ```ts
 * const nfts = await metaplex
 *   .candyMachines()
 *   .findMintedNfts({ candyMachine })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findMintedNftsByCandyMachineOperation: import("../../../types").OperationConstructor<FindMintedNftsByCandyMachineOperation, "FindMintedNftsByCandyMachineOperation", FindMintedNftsByCandyMachineInput, FindMintedNftsByCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindMintedNftsByCandyMachineOperation = Operation<typeof Key, FindMintedNftsByCandyMachineInput, FindMintedNftsByCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindMintedNftsByCandyMachineInput = {
    /** The Candy Machine address. */
    candyMachine: PublicKey;
    /**
     * The Candy Machine version
     *
     * @defaultValue `2`
     */
    version?: 1 | 2;
    /** The level of commitment desired when querying the blockchain. */
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindMintedNftsByCandyMachineOutput = (Metadata | Nft)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findMintedNftsByCandyMachineOperationHandler: OperationHandler<FindMintedNftsByCandyMachineOperation>;
export {};
