'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var accounts = require('../accounts.cjs');
var CandyMachine = require('../models/CandyMachine.cjs');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var common = require('../../../utils/common.cjs');
var Operation = require('../../../types/Operation.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var Mint = require('../../tokenModule/models/Mint.cjs');
var accounts$1 = require('../../tokenModule/accounts.cjs');

// Operation
// -----------------

const Key = 'FindCandyMachinesByPublicKeyOperation';
/**
 * Find all Candy Machines matching by a given `publicKey` or a given `type`.
 *
 * The following two types are supported.
 *
 * `authority`: Find Candy Machines whose authority is the given `publicKey`.
 * ```ts
 * const someAuthority = new PublicKey('...');
 * const candyMachines = await metaplex
 *   .candyMachines()
 *   .findAllBy({ type: 'authority', someAuthority });
 *   .run();
 * ```
 *
 * `wallet`: Find Candy Machines whose wallet address is the given `publicKey`.
 * ```ts
 * const someWallet = new PublicKey('...');
 * const candyMachines = await metaplex
 *   .candyMachines()
 *   .findAllBy({ type: 'wallet', someWallet });
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findCandyMachinesByPublicKeyFieldOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findCandyMachinesByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts$2 = program.CandyMachineProgram.accounts(metaplex).mergeConfig({
      commitment
    });
    let candyMachineQuery;

    switch (type) {
      case 'authority':
        candyMachineQuery = accounts$2.candyMachineAccountsForAuthority(publicKey);
        break;

      case 'wallet':
        candyMachineQuery = accounts$2.candyMachineAccountsForWallet(publicKey);
        break;

      default:
        throw new SdkError.UnreachableCaseError(type);
    }

    const unparsedAccounts = await candyMachineQuery.get();
    scope.throwIfCanceled();
    const collectionPdas = unparsedAccounts.map(unparsedAccount => pdas.findCandyMachineCollectionPda(unparsedAccount.publicKey)); // Find mint details for all unique SPL tokens used
    // in candy machines that have non-null `tokenMint`

    const parsedAccounts = Object.fromEntries(unparsedAccounts.map(unparsedAccount => [unparsedAccount.publicKey.toString(), accounts.parseCandyMachineAccount(unparsedAccount)]));
    const tokenMints = [...new Set(Object.values(parsedAccounts).map(account => {
      var _account$data$tokenMi;

      return (_account$data$tokenMi = account.data.tokenMint) === null || _account$data$tokenMi === void 0 ? void 0 : _account$data$tokenMi.toString();
    }).filter(tokenMint => tokenMint !== undefined))].map(address => new web3_js.PublicKey(address));
    const result = await metaplex.rpc().getMultipleAccounts(tokenMints.concat(collectionPdas), commitment);
    scope.throwIfCanceled();
    const unparsedMintAccounts = result.slice(0, tokenMints.length);
    const unparsedCollectionAccounts = result.slice(-collectionPdas.length);
    const mints = Object.fromEntries(unparsedMintAccounts.map(account => [account.publicKey.toString(), Mint.toMint(accounts$1.toMintAccount(account))]));
    return common.zipMap(unparsedAccounts, unparsedCollectionAccounts, (unparsedAccount, unparsedCollectionAccount) => {
      var _parsedAccount$data$t;

      const parsedAccount = parsedAccounts[unparsedAccount.publicKey.toString()];
      const collectionAccount = unparsedCollectionAccount ? accounts.parseCandyMachineCollectionAccount(unparsedCollectionAccount) : null;
      const tokenMintAddress = (_parsedAccount$data$t = parsedAccount.data.tokenMint) === null || _parsedAccount$data$t === void 0 ? void 0 : _parsedAccount$data$t.toString();
      return CandyMachine.toCandyMachine(parsedAccount, unparsedAccount, collectionAccount, tokenMintAddress ? mints[tokenMintAddress] : null);
    });
  }
};

exports.findCandyMachinesByPublicKeyFieldOperation = findCandyMachinesByPublicKeyFieldOperation;
exports.findCandyMachinesByPublicKeyFieldOperationHandler = findCandyMachinesByPublicKeyFieldOperationHandler;
//# sourceMappingURL=findCandyMachinesByPublicKeyField.cjs.map
