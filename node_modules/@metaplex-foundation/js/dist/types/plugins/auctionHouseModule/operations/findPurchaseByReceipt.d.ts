import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../../types';
import { AuctionHouse, Purchase } from '../models';
declare const Key: "FindPurchaseByReceiptOperation";
/**
 * Finds a Purchase by its receipt address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findPurchaseByReceipt({ receiptAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findPurchaseByReceiptOperation: import("../../../types").OperationConstructor<FindPurchaseByReceiptOperation, "FindPurchaseByReceiptOperation", FindPurchaseByReceiptInput, Readonly<{
    model: "purchase";
    lazy: false;
    auctionHouse: AuctionHouse;
    asset: import("../..").SftWithToken | import("../..").NftWithToken;
    buyerAddress: PublicKey;
    sellerAddress: PublicKey;
    bookkeeperAddress: import("../../../utils").Option<PublicKey>;
    receiptAddress: import("../../../utils").Option<PublicKey>;
    price: import("../../../types").SplTokenAmount | import("../../../types").SolAmount;
    tokens: import("../../../types").SplTokenAmount;
    createdAt: import("../../../types").DateTime;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindPurchaseByReceiptOperation = Operation<typeof Key, FindPurchaseByReceiptInput, Purchase>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindPurchaseByReceiptInput = {
    /**
     * The address of the purchase receipt account.
     * This is the account that stores information about this purchase.
     * The Purchase model is built on top of this account.
     */
    receiptAddress: PublicKey;
    /** A model of the Auction House related to this purchase. */
    auctionHouse: AuctionHouse;
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
export declare const findPurchaseByReceiptOperationHandler: OperationHandler<FindPurchaseByReceiptOperation>;
export {};
