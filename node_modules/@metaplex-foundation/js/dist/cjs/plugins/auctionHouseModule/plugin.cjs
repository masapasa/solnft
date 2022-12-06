'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var AuctionHouseClient = require('./AuctionHouseClient.cjs');
var program = require('./program.cjs');
var cancelBid = require('./operations/cancelBid.cjs');
var cancelListing = require('./operations/cancelListing.cjs');
var createAuctionHouse = require('./operations/createAuctionHouse.cjs');
var createBid = require('./operations/createBid.cjs');
var createListing = require('./operations/createListing.cjs');
var depositToBuyerAccount = require('./operations/depositToBuyerAccount.cjs');
var executeSale = require('./operations/executeSale.cjs');
var findAuctionHouseByAddress = require('./operations/findAuctionHouseByAddress.cjs');
var findAuctionHouseByCreatorAndMint = require('./operations/findAuctionHouseByCreatorAndMint.cjs');
var findBidByReceipt = require('./operations/findBidByReceipt.cjs');
var findBidByTradeState = require('./operations/findBidByTradeState.cjs');
var findBidsByPublicKeyField = require('./operations/findBidsByPublicKeyField.cjs');
var findListingByReceipt = require('./operations/findListingByReceipt.cjs');
var findListingByTradeState = require('./operations/findListingByTradeState.cjs');
var findListingsByPublicKeyField = require('./operations/findListingsByPublicKeyField.cjs');
var findPurchaseByReceipt = require('./operations/findPurchaseByReceipt.cjs');
var findPurchaseByTradeState = require('./operations/findPurchaseByTradeState.cjs');
var findPurchasesByPublicKeyField = require('./operations/findPurchasesByPublicKeyField.cjs');
var getBuyerBalance = require('./operations/getBuyerBalance.cjs');
var loadBid = require('./operations/loadBid.cjs');
var loadListing = require('./operations/loadListing.cjs');
var loadPurchase = require('./operations/loadPurchase.cjs');
var updateAuctionHouse = require('./operations/updateAuctionHouse.cjs');
var withdrawFromBuyerAccount = require('./operations/withdrawFromBuyerAccount.cjs');
var withdrawFromFeeAccount = require('./operations/withdrawFromFeeAccount.cjs');
var withdrawFromTreasuryAccount = require('./operations/withdrawFromTreasuryAccount.cjs');

/** @group Plugins */

const auctionHouseModule = () => ({
  install(metaplex) {
    // Auction House Program.
    metaplex.programs().register({
      name: 'AuctionHouseProgram',
      address: program.AuctionHouseProgram.publicKey,
      errorResolver: error => mplAuctionHouse.cusper.errorFromProgramLogs(error.logs, false)
    });
    const op = metaplex.operations();
    op.register(cancelBid.cancelBidOperation, cancelBid.cancelBidOperationHandler);
    op.register(cancelListing.cancelListingOperation, cancelListing.cancelListingOperationHandler);
    op.register(createAuctionHouse.createAuctionHouseOperation, createAuctionHouse.createAuctionHouseOperationHandler);
    op.register(createBid.createBidOperation, createBid.createBidOperationHandler);
    op.register(createListing.createListingOperation, createListing.createListingOperationHandler);
    op.register(depositToBuyerAccount.depositToBuyerAccountOperation, depositToBuyerAccount.depositToBuyerAccountOperationHandler);
    op.register(executeSale.executeSaleOperation, executeSale.executeSaleOperationHandler);
    op.register(findAuctionHouseByAddress.findAuctionHouseByAddressOperation, findAuctionHouseByAddress.findAuctionHouseByAddressOperationHandler);
    op.register(findAuctionHouseByCreatorAndMint.findAuctionHouseByCreatorAndMintOperation, findAuctionHouseByCreatorAndMint.findAuctionHouseByCreatorAndMintOperationHandler);
    op.register(findBidByReceipt.findBidByReceiptOperation, findBidByReceipt.findBidByReceiptOperationHandler);
    op.register(findBidByTradeState.findBidByTradeStateOperation, findBidByTradeState.findBidByTradeStateOperationHandler);
    op.register(findBidsByPublicKeyField.findBidsByPublicKeyFieldOperation, findBidsByPublicKeyField.findBidsByPublicKeyFieldOperationHandler);
    op.register(findListingByReceipt.findListingByReceiptOperation, findListingByReceipt.findListingByReceiptOperationHandler);
    op.register(findListingByTradeState.findListingByTradeStateOperation, findListingByTradeState.findListingByTradeStateOperationHandler);
    op.register(findListingsByPublicKeyField.findListingsByPublicKeyFieldOperation, findListingsByPublicKeyField.findListingsByPublicKeyFieldOperationHandler);
    op.register(findPurchaseByReceipt.findPurchaseByReceiptOperation, findPurchaseByReceipt.findPurchaseByReceiptOperationHandler);
    op.register(findPurchaseByTradeState.findPurchaseByTradeStateOperation, findPurchaseByTradeState.findPurchaseByTradeStateOperationHandler);
    op.register(findPurchasesByPublicKeyField.findPurchasesByPublicKeyFieldOperation, findPurchasesByPublicKeyField.findPurchasesByPublicKeyFieldOperationHandler);
    op.register(getBuyerBalance.getBuyerBalanceOperation, getBuyerBalance.getBuyerBalanceOperationHandler);
    op.register(loadBid.loadBidOperation, loadBid.loadBidOperationHandler);
    op.register(loadListing.loadListingOperation, loadListing.loadListingOperationHandler);
    op.register(loadPurchase.loadPurchaseOperation, loadPurchase.loadPurchaseOperationHandler);
    op.register(updateAuctionHouse.updateAuctionHouseOperation, updateAuctionHouse.updateAuctionHouseOperationHandler);
    op.register(withdrawFromBuyerAccount.withdrawFromBuyerAccountOperation, withdrawFromBuyerAccount.withdrawFromBuyerAccountOperationHandler);
    op.register(withdrawFromFeeAccount.withdrawFromFeeAccountOperation, withdrawFromFeeAccount.withdrawFromFeeAccountOperationHandler);
    op.register(withdrawFromTreasuryAccount.withdrawFromTreasuryAccountOperation, withdrawFromTreasuryAccount.withdrawFromTreasuryAccountOperationHandler);

    metaplex.auctionHouse = function () {
      return new AuctionHouseClient.AuctionHouseClient(this);
    };
  }

});

exports.auctionHouseModule = auctionHouseModule;
//# sourceMappingURL=plugin.cjs.map
