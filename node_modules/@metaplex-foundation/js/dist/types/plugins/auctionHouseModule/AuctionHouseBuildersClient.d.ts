import type { Metaplex } from '../../Metaplex';
import { DepositToBuyerAccountBuilderParams, CancelBidBuilderParams, CancelListingBuilderParams, WithdrawFromBuyerAccountBuilderParams } from './operations';
import { CreateAuctionHouseBuilderParams } from './operations/createAuctionHouse';
import { CreateBidBuilderParams } from './operations/createBid';
import { CreateListingBuilderParams } from './operations/createListing';
import { ExecuteSaleBuilderParams } from './operations/executeSale';
import { UpdateAuctionHouseBuilderParams } from './operations/updateAuctionHouse';
/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the Auction House module.
 *
 * @see {@link AuctionsClient}
 * @group Module Builders
 * */
export declare class AuctionHouseBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /** {@inheritDoc createBidBuilder} */
    bid(input: CreateBidBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateBidBuilderContext>>;
    /** {@inheritDoc cancelBidBuilder} */
    cancelBid(input: CancelBidBuilderParams): import("../..").TransactionBuilder<import("./operations").CancelBidBuilderContext>;
    /** {@inheritDoc cancelListingBuilder} */
    cancelListing(input: CancelListingBuilderParams): import("../..").TransactionBuilder<import("./operations").CancelListingBuilderContext>;
    /** {@inheritDoc createAuctionHouseBuilder} */
    createAuctionHouse(input: CreateAuctionHouseBuilderParams): import("../..").TransactionBuilder<import("./operations").CreateAuctionHouseBuilderContext>;
    /** {@inheritDoc depositToBuyerAccountBuilder} */
    depositToBuyerAccount(input: DepositToBuyerAccountBuilderParams): import("../..").TransactionBuilder<import("./operations").DepositToBuyerAccountBuilderContext>;
    /** {@inheritDoc executeSaleBuilder} */
    executeSale(input: ExecuteSaleBuilderParams): import("../..").TransactionBuilder<import("./operations").ExecuteSaleBuilderContext>;
    /** {@inheritDoc createListingBuilder} */
    list(input: CreateListingBuilderParams): import("../..").TransactionBuilder<import("./operations").CreateListingBuilderContext>;
    /** {@inheritDoc updateAuctionHouseBuilder} */
    updateAuctionHouse(input: UpdateAuctionHouseBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc withdrawFromBuyerAccountBuilder} */
    withdrawFromBuyerAccount(input: WithdrawFromBuyerAccountBuilderParams): import("../..").TransactionBuilder<import("./operations").WithdrawFromBuyerAccountBuilderContext>;
}
