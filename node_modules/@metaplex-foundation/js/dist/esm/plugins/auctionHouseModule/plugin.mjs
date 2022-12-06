import { cusper } from '@metaplex-foundation/mpl-auction-house';
import { AuctionHouseClient } from './AuctionHouseClient.mjs';
import { AuctionHouseProgram } from './program.mjs';
import { cancelBidOperation, cancelBidOperationHandler } from './operations/cancelBid.mjs';
import { cancelListingOperation, cancelListingOperationHandler } from './operations/cancelListing.mjs';
import { createAuctionHouseOperation, createAuctionHouseOperationHandler } from './operations/createAuctionHouse.mjs';
import { createBidOperation, createBidOperationHandler } from './operations/createBid.mjs';
import { createListingOperation, createListingOperationHandler } from './operations/createListing.mjs';
import { depositToBuyerAccountOperation, depositToBuyerAccountOperationHandler } from './operations/depositToBuyerAccount.mjs';
import { executeSaleOperation, executeSaleOperationHandler } from './operations/executeSale.mjs';
import { findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler } from './operations/findAuctionHouseByAddress.mjs';
import { findAuctionHouseByCreatorAndMintOperation, findAuctionHouseByCreatorAndMintOperationHandler } from './operations/findAuctionHouseByCreatorAndMint.mjs';
import { findBidByReceiptOperation, findBidByReceiptOperationHandler } from './operations/findBidByReceipt.mjs';
import { findBidByTradeStateOperation, findBidByTradeStateOperationHandler } from './operations/findBidByTradeState.mjs';
import { findBidsByPublicKeyFieldOperation, findBidsByPublicKeyFieldOperationHandler } from './operations/findBidsByPublicKeyField.mjs';
import { findListingByReceiptOperation, findListingByReceiptOperationHandler } from './operations/findListingByReceipt.mjs';
import { findListingByTradeStateOperation, findListingByTradeStateOperationHandler } from './operations/findListingByTradeState.mjs';
import { findListingsByPublicKeyFieldOperation, findListingsByPublicKeyFieldOperationHandler } from './operations/findListingsByPublicKeyField.mjs';
import { findPurchaseByReceiptOperation, findPurchaseByReceiptOperationHandler } from './operations/findPurchaseByReceipt.mjs';
import { findPurchaseByTradeStateOperation, findPurchaseByTradeStateOperationHandler } from './operations/findPurchaseByTradeState.mjs';
import { findPurchasesByPublicKeyFieldOperation, findPurchasesByPublicKeyFieldOperationHandler } from './operations/findPurchasesByPublicKeyField.mjs';
import { getBuyerBalanceOperation, getBuyerBalanceOperationHandler } from './operations/getBuyerBalance.mjs';
import { loadBidOperation, loadBidOperationHandler } from './operations/loadBid.mjs';
import { loadListingOperation, loadListingOperationHandler } from './operations/loadListing.mjs';
import { loadPurchaseOperation, loadPurchaseOperationHandler } from './operations/loadPurchase.mjs';
import { updateAuctionHouseOperation, updateAuctionHouseOperationHandler } from './operations/updateAuctionHouse.mjs';
import { withdrawFromBuyerAccountOperation, withdrawFromBuyerAccountOperationHandler } from './operations/withdrawFromBuyerAccount.mjs';
import { withdrawFromFeeAccountOperation, withdrawFromFeeAccountOperationHandler } from './operations/withdrawFromFeeAccount.mjs';
import { withdrawFromTreasuryAccountOperation, withdrawFromTreasuryAccountOperationHandler } from './operations/withdrawFromTreasuryAccount.mjs';

/** @group Plugins */

const auctionHouseModule = () => ({
  install(metaplex) {
    // Auction House Program.
    metaplex.programs().register({
      name: 'AuctionHouseProgram',
      address: AuctionHouseProgram.publicKey,
      errorResolver: error => cusper.errorFromProgramLogs(error.logs, false)
    });
    const op = metaplex.operations();
    op.register(cancelBidOperation, cancelBidOperationHandler);
    op.register(cancelListingOperation, cancelListingOperationHandler);
    op.register(createAuctionHouseOperation, createAuctionHouseOperationHandler);
    op.register(createBidOperation, createBidOperationHandler);
    op.register(createListingOperation, createListingOperationHandler);
    op.register(depositToBuyerAccountOperation, depositToBuyerAccountOperationHandler);
    op.register(executeSaleOperation, executeSaleOperationHandler);
    op.register(findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler);
    op.register(findAuctionHouseByCreatorAndMintOperation, findAuctionHouseByCreatorAndMintOperationHandler);
    op.register(findBidByReceiptOperation, findBidByReceiptOperationHandler);
    op.register(findBidByTradeStateOperation, findBidByTradeStateOperationHandler);
    op.register(findBidsByPublicKeyFieldOperation, findBidsByPublicKeyFieldOperationHandler);
    op.register(findListingByReceiptOperation, findListingByReceiptOperationHandler);
    op.register(findListingByTradeStateOperation, findListingByTradeStateOperationHandler);
    op.register(findListingsByPublicKeyFieldOperation, findListingsByPublicKeyFieldOperationHandler);
    op.register(findPurchaseByReceiptOperation, findPurchaseByReceiptOperationHandler);
    op.register(findPurchaseByTradeStateOperation, findPurchaseByTradeStateOperationHandler);
    op.register(findPurchasesByPublicKeyFieldOperation, findPurchasesByPublicKeyFieldOperationHandler);
    op.register(getBuyerBalanceOperation, getBuyerBalanceOperationHandler);
    op.register(loadBidOperation, loadBidOperationHandler);
    op.register(loadListingOperation, loadListingOperationHandler);
    op.register(loadPurchaseOperation, loadPurchaseOperationHandler);
    op.register(updateAuctionHouseOperation, updateAuctionHouseOperationHandler);
    op.register(withdrawFromBuyerAccountOperation, withdrawFromBuyerAccountOperationHandler);
    op.register(withdrawFromFeeAccountOperation, withdrawFromFeeAccountOperationHandler);
    op.register(withdrawFromTreasuryAccountOperation, withdrawFromTreasuryAccountOperationHandler);

    metaplex.auctionHouse = function () {
      return new AuctionHouseClient(this);
    };
  }

});

export { auctionHouseModule };
//# sourceMappingURL=plugin.mjs.map
