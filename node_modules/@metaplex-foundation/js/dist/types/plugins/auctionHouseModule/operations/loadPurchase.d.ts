import type { Commitment } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../../types';
import { Purchase, LazyPurchase } from '../models/Purchase';
declare const Key: "LoadPurchaseOperation";
/**
 * Transforms a `LazyPurchase` model into a `Purchase` model.
 *
 * ```ts
 * const purchase = await metaplex
 *   .auctionHouse()
 *   .loadPurchase({ lazyPurchase })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const loadPurchaseOperation: import("../../../types").OperationConstructor<LoadPurchaseOperation, "LoadPurchaseOperation", LoadPurchaseInput, Readonly<{
    model: "purchase";
    lazy: false;
    auctionHouse: import("..").AuctionHouse;
    asset: import("../../nftModule").SftWithToken | import("../../nftModule").NftWithToken;
    buyerAddress: import("@solana/web3.js").PublicKey;
    /**
     * @group Operations
     * @category Inputs
     */
    sellerAddress: import("@solana/web3.js").PublicKey;
    bookkeeperAddress: import("../../../utils").Option<import("@solana/web3.js").PublicKey>;
    receiptAddress: import("../../../utils").Option<import("@solana/web3.js").PublicKey>;
    price: import("../../../types").SplTokenAmount | import("../../../types").SolAmount;
    tokens: import("../../../types").SplTokenAmount;
    createdAt: import("../../../types").DateTime;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type LoadPurchaseOperation = Operation<typeof Key, LoadPurchaseInput, Purchase>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type LoadPurchaseInput = {
    /** The `LazyPurchase` model to transform into the `Purchase`.  */
    lazyPurchase: LazyPurchase;
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
 * @category Handlers
 */
export declare const loadPurchaseOperationHandler: OperationHandler<LoadPurchaseOperation>;
export {};
