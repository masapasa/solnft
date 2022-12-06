import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../../types';
import { AuctionHouse, Bid } from '../models';
declare const Key: "FindBidByReceiptOperation";
/**
 * Finds a Bid by its receipt address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findBidByReceipt({ receiptAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findBidByReceiptOperation: import("../../../types").OperationConstructor<FindBidByReceiptOperation, "FindBidByReceiptOperation", FindBidByReceiptInput, Readonly<{
    model: "bid";
    lazy: false;
    auctionHouse: AuctionHouse;
    tradeStateAddress: import("../../../types").Pda;
    buyerAddress: PublicKey;
    bookkeeperAddress: import("../../../utils").Option<PublicKey>;
    receiptAddress: import("../../../utils").Option<import("../../../types").Pda>;
    purchaseReceiptAddress: import("../../../utils").Option<PublicKey>;
    price: import("../../../types").SplTokenAmount | import("../../../types").SolAmount;
    tokens: import("../../../types").SplTokenAmount;
    createdAt: import("../../../types").DateTime;
    canceledAt: import("../../../utils").Option<import("../../../types").DateTime>;
} & {
    isPublic: false;
    asset: import("../..").SftWithToken | import("../..").NftWithToken;
}> | Readonly<{
    model: "bid";
    lazy: false;
    auctionHouse: AuctionHouse;
    tradeStateAddress: import("../../../types").Pda;
    buyerAddress: PublicKey;
    bookkeeperAddress: import("../../../utils").Option<PublicKey>;
    receiptAddress: import("../../../utils").Option<import("../../../types").Pda>;
    purchaseReceiptAddress: import("../../../utils").Option<PublicKey>;
    price: import("../../../types").SplTokenAmount | import("../../../types").SolAmount;
    tokens: import("../../../types").SplTokenAmount;
    createdAt: import("../../../types").DateTime;
    canceledAt: import("../../../utils").Option<import("../../../types").DateTime>;
} & {
    isPublic: true;
    asset: import("../..").Sft | import("../..").Nft;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindBidByReceiptOperation = Operation<typeof Key, FindBidByReceiptInput, Bid>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindBidByReceiptInput = {
    /**
     * The address of the bid receipt account.
     * This is the account that stores information about this bid.
     * The Bid model is built on top of this account.
     */
    receiptAddress: PublicKey;
    /** A model of the Auction House related to this bid. */
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
export declare const findBidByReceiptOperationHandler: OperationHandler<FindBidByReceiptOperation>;
export {};
