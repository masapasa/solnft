import { Metaplex } from '../../Metaplex';
import { BidReceiptGpaBuilder, ListingReceiptGpaBuilder, PurchaseReceiptGpaBuilder } from './gpaBuilders';
/** @group Programs */
export declare const AuctionHouseProgram: {
    publicKey: import("@solana/web3.js").PublicKey;
    bidAccounts(metaplex: Metaplex): BidReceiptGpaBuilder;
    listingAccounts(metaplex: Metaplex): ListingReceiptGpaBuilder;
    purchaseAccounts(metaplex: Metaplex): PurchaseReceiptGpaBuilder;
};
