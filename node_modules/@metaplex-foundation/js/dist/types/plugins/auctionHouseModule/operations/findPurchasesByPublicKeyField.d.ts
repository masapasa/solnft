import { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../../types';
import { AuctionHouse, Purchase, LazyPurchase } from '../models';
declare const Key: "FindPurchasesByPublicKeyOperation";
/**
 * Finds multiple Purchases by specific criteria.
 *
 * ```ts
 * // Find purchases by seller.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'seller', publicKey: seller })
 *   .run();
 *
 * // Find purchases by buyer.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'buyer', publicKey: buyer })
 *   .run();
 *
 * // Find purchases by metadata.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'metadata', publicKey: metadata })
 *   .run();
 *
 * // Find purchases by mint.
 * const purchases = await metaplex
 *   .auctionHouse()
 *   .findPurchasesBy({ auctionHouse, type: 'mint', publicKey: mint })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findPurchasesByPublicKeyFieldOperation: import("../../../types").OperationConstructor<FindPurchasesByPublicKeyFieldOperation, "FindPurchasesByPublicKeyOperation", FindPurchasesByPublicKeyFieldInput, FindPurchasesByPublicKeyFieldOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindPurchasesByPublicKeyFieldOperation = Operation<typeof Key, FindPurchasesByPublicKeyFieldInput, FindPurchasesByPublicKeyFieldOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindPurchasesByPublicKeyFieldInput = {
    /** A type of criteria to use in search. */
    type: 'buyer' | 'seller' | 'metadata' | 'mint';
    /** A model of the Auction House related to these purchases. */
    auctionHouse: AuctionHouse;
    /** The address to search for. */
    publicKey: PublicKey;
    /** The level of commitment desired when querying the blockchain. */
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindPurchasesByPublicKeyFieldOutput = (Purchase | LazyPurchase)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findPurchasesByPublicKeyFieldOperationHandler: OperationHandler<FindPurchasesByPublicKeyFieldOperation>;
export {};
