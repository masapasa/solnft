import type { Metaplex } from '../../Metaplex';
import { Task } from '../../utils';
import { AuctionHouse, Bid, Listing, Purchase } from './models';
import { AuctionHouseBuildersClient } from './AuctionHouseBuildersClient';
import { CancelBidInput, CancelBidOutput, CancelListingInput, CancelListingOutput, CreateAuctionHouseInput, CreateAuctionHouseOutput, CreateBidInput, CreateBidOutput, CreateListingInput, CreateListingOutput, DepositToBuyerAccountInput, DepositToBuyerAccountOutput, ExecuteSaleInput, ExecuteSaleOutput, FindAuctionHouseByAddressInput, FindAuctionHouseByCreatorAndMintInput, FindBidByReceiptInput, FindBidByTradeStateInput, FindBidsByPublicKeyFieldInput, FindListingByReceiptInput, FindListingByTradeStateInput, FindListingsByPublicKeyFieldInput, FindPurchaseByReceiptInput, FindPurchaseByTradeStateInput, FindPurchasesByPublicKeyFieldInput, GetBuyerBalanceInput, GetBuyerBalanceOutput, LoadBidInput, LoadListingInput, LoadPurchaseInput, UpdateAuctionHouseInput, UpdateAuctionHouseOutput, WithdrawFromBuyerAccountInput, WithdrawFromBuyerAccountOutput, WithdrawFromFeeAccountInput, WithdrawFromFeeAccountOutput, WithdrawFromTreasuryAccountInput, WithdrawFromTreasuryAccountOutput } from './operations';
/**
 * This is a client for the Auction House module.
 *
 * It enables us to interact with the Auction House program in order to
 * create and update Auction House to configure a marketplace as well to allow
 * users to list, bid and execute sales.
 *
 * You may access this client via the `auctionHouse()` method of your `Metaplex` instance.
 *
 * ```ts
 * const auctionHouseClient = metaplex.auctionHouse();
 * ```
 *
 * @example
 * You can create a new Auction House with minimum input like so.
 * By default, the current identity of the Metaplex instance will be
 * the authority of the Auction House.
 *
 * ```ts
 * const { auctionHouse } = await metaplex
 *   .auctionHouse()
 *   .create({
 *     sellerFeeBasisPoints: 500, // 5% royalties
 *   })
 *   .run();
 * ```
 *
 * @see {@link AuctionHouse} The `AuctionHouse` model
 * @group Modules
 */
export declare class AuctionHouseClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /**
     * You may use the `builders()` client to access the
     * underlying Transaction Builders of this module.
     *
     * ```ts
     * const buildersClient = metaplex.auctions().builders();
     * ```
     */
    builders(): AuctionHouseBuildersClient;
    /** {@inheritDoc createBidOperation} */
    bid(input: CreateBidInput): Task<CreateBidOutput>;
    /** {@inheritDoc cancelBidOperation} */
    cancelBid(input: CancelBidInput): Task<CancelBidOutput>;
    /** {@inheritDoc cancelListingOperation} */
    cancelListing(input: CancelListingInput): Task<CancelListingOutput>;
    /** {@inheritDoc createAuctionHouseOperation} */
    create(input: CreateAuctionHouseInput): Task<CreateAuctionHouseOutput>;
    /** {@inheritDoc depositToBuyerAccountOperation} */
    depositToBuyerAccount(input: DepositToBuyerAccountInput): Task<DepositToBuyerAccountOutput>;
    /** {@inheritDoc executeSaleOperation} */
    executeSale(input: ExecuteSaleInput): Task<ExecuteSaleOutput>;
    /** {@inheritDoc findAuctionHouseByAddressOperation} */
    findByAddress(options: FindAuctionHouseByAddressInput): Task<AuctionHouse>;
    /** {@inheritDoc findAuctionHouseByCreatorAndMintOperation} */
    findByCreatorAndMint(options: FindAuctionHouseByCreatorAndMintInput): Task<AuctionHouse>;
    /** {@inheritDoc findBidByReceiptOperation} */
    findBidByReceipt(options: FindBidByReceiptInput): Task<Readonly<{
        model: "bid";
        lazy: false;
        auctionHouse: AuctionHouse;
        tradeStateAddress: import("../..").Pda;
        buyerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("../..").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
        canceledAt: import("../../utils").Option<import("../..").DateTime>;
    } & {
        isPublic: false;
        asset: import("..").SftWithToken | import("..").NftWithToken;
    }> | Readonly<{
        model: "bid";
        lazy: false;
        auctionHouse: AuctionHouse;
        tradeStateAddress: import("../..").Pda;
        buyerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("../..").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
        canceledAt: import("../../utils").Option<import("../..").DateTime>;
    } & {
        isPublic: true;
        asset: import("..").Sft | import("..").Nft;
    }>, []>;
    /** {@inheritDoc findBidByTradeStateOperation} */
    findBidByTradeState(options: FindBidByTradeStateInput): Task<Readonly<{
        model: "bid";
        lazy: false;
        auctionHouse: AuctionHouse;
        tradeStateAddress: import("../..").Pda;
        buyerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("../..").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
        canceledAt: import("../../utils").Option<import("../..").DateTime>;
    } & {
        isPublic: false;
        asset: import("..").SftWithToken | import("..").NftWithToken;
    }> | Readonly<{
        model: "bid";
        lazy: false;
        auctionHouse: AuctionHouse;
        tradeStateAddress: import("../..").Pda;
        buyerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("../..").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
        canceledAt: import("../../utils").Option<import("../..").DateTime>;
    } & {
        isPublic: true;
        asset: import("..").Sft | import("..").Nft;
    }>, []>;
    /** {@inheritDoc findBidsByPublicKeyFieldOperation} */
    findBidsBy(input: FindBidsByPublicKeyFieldInput): Task<import("./operations").FindBidsByPublicKeyFieldOutput, []>;
    /** {@inheritDoc findListingByTradeStateOperation} */
    findListingByTradeState(options: FindListingByTradeStateInput): Task<Readonly<{
        model: "listing";
        lazy: false;
        auctionHouse: AuctionHouse;
        asset: import("..").SftWithToken | import("..").NftWithToken;
        tradeStateAddress: import("../..").Pda;
        sellerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("../..").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
        canceledAt: import("../../utils").Option<import("../..").DateTime>;
    }>, []>;
    /** {@inheritDoc findListingByReceiptOperation} */
    findListingByReceipt(options: FindListingByReceiptInput): Task<Readonly<{
        model: "listing";
        lazy: false;
        auctionHouse: AuctionHouse;
        asset: import("..").SftWithToken | import("..").NftWithToken;
        tradeStateAddress: import("../..").Pda;
        sellerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("../..").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
        canceledAt: import("../../utils").Option<import("../..").DateTime>;
    }>, []>;
    /** {@inheritDoc findListingsByPublicKeyFieldOperation} */
    findListingsBy(input: FindListingsByPublicKeyFieldInput): Task<import("./operations").FindListingsByPublicKeyFieldOutput, []>;
    /** {@inheritDoc findPurchaseByTradeStateOperation} */
    findPurchaseByTradeState(options: FindPurchaseByTradeStateInput): Task<Readonly<{
        model: "purchase";
        lazy: false;
        auctionHouse: AuctionHouse;
        asset: import("..").SftWithToken | import("..").NftWithToken;
        buyerAddress: import("@solana/web3.js").PublicKey;
        sellerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
    }>, []>;
    /** {@inheritDoc findPurchaseByReceiptOperation} */
    findPurchaseByReceipt(options: FindPurchaseByReceiptInput): Task<Readonly<{
        model: "purchase";
        lazy: false;
        auctionHouse: AuctionHouse;
        asset: import("..").SftWithToken | import("..").NftWithToken;
        buyerAddress: import("@solana/web3.js").PublicKey;
        sellerAddress: import("@solana/web3.js").PublicKey;
        bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        receiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
        price: import("../..").SplTokenAmount | import("../..").SolAmount;
        tokens: import("../..").SplTokenAmount;
        createdAt: import("../..").DateTime;
    }>, []>;
    /** {@inheritDoc findPurchasesByPublicKeyFieldOperation} */
    findPurchasesBy(input: FindPurchasesByPublicKeyFieldInput): Task<import("./operations").FindPurchasesByPublicKeyFieldOutput, []>;
    /** {@inheritDoc getBuyerBalanceOperation} */
    getBuyerBalance(options: GetBuyerBalanceInput): Task<GetBuyerBalanceOutput>;
    /** {@inheritDoc createListingOperation} */
    list(input: CreateListingInput): Task<CreateListingOutput>;
    /** {@inheritDoc loadBidOperation} */
    loadBid(options: LoadBidInput): Task<Bid>;
    /** {@inheritDoc loadListingOperation} */
    loadListing(options: LoadListingInput): Task<Listing>;
    /** {@inheritDoc loadPurchaseOperation} */
    loadPurchase(options: LoadPurchaseInput): Task<Purchase>;
    /** {@inheritDoc updateAuctionHouseOperation} */
    update(options: UpdateAuctionHouseInput): Task<UpdateAuctionHouseOutput>;
    /** {@inheritDoc withdrawFromBuyerAccountOperation} */
    withdrawFromBuyerAccount(input: WithdrawFromBuyerAccountInput): Task<WithdrawFromBuyerAccountOutput>;
    /** {@inheritDoc withdrawFromFeeAccountOperation} */
    withdrawFromFeeAccount(input: WithdrawFromFeeAccountInput): Task<WithdrawFromFeeAccountOutput>;
    /** {@inheritDoc withdrawFromTreasuryAccountOperation} */
    withdrawFromTreasuryAccount(input: WithdrawFromTreasuryAccountInput): Task<WithdrawFromTreasuryAccountOutput>;
}
