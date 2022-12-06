import { PublicKey } from '@solana/web3.js';
import { parseCandyMachineAccount, parseCandyMachineCollectionAccount } from '../accounts.mjs';
import { toCandyMachine } from '../models/CandyMachine.mjs';
import { findCandyMachineCollectionPda } from '../pdas.mjs';
import { CandyMachineProgram } from '../program.mjs';
import { zipMap } from '../../../utils/common.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { UnreachableCaseError } from '../../../errors/SdkError.mjs';
import { toMint } from '../../tokenModule/models/Mint.mjs';
import { toMintAccount } from '../../tokenModule/accounts.mjs';

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

const findCandyMachinesByPublicKeyFieldOperation = useOperation(Key);
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
    const accounts = CandyMachineProgram.accounts(metaplex).mergeConfig({
      commitment
    });
    let candyMachineQuery;

    switch (type) {
      case 'authority':
        candyMachineQuery = accounts.candyMachineAccountsForAuthority(publicKey);
        break;

      case 'wallet':
        candyMachineQuery = accounts.candyMachineAccountsForWallet(publicKey);
        break;

      default:
        throw new UnreachableCaseError(type);
    }

    const unparsedAccounts = await candyMachineQuery.get();
    scope.throwIfCanceled();
    const collectionPdas = unparsedAccounts.map(unparsedAccount => findCandyMachineCollectionPda(unparsedAccount.publicKey)); // Find mint details for all unique SPL tokens used
    // in candy machines that have non-null `tokenMint`

    const parsedAccounts = Object.fromEntries(unparsedAccounts.map(unparsedAccount => [unparsedAccount.publicKey.toString(), parseCandyMachineAccount(unparsedAccount)]));
    const tokenMints = [...new Set(Object.values(parsedAccounts).map(account => {
      var _account$data$tokenMi;

      return (_account$data$tokenMi = account.data.tokenMint) === null || _account$data$tokenMi === void 0 ? void 0 : _account$data$tokenMi.toString();
    }).filter(tokenMint => tokenMint !== undefined))].map(address => new PublicKey(address));
    const result = await metaplex.rpc().getMultipleAccounts(tokenMints.concat(collectionPdas), commitment);
    scope.throwIfCanceled();
    const unparsedMintAccounts = result.slice(0, tokenMints.length);
    const unparsedCollectionAccounts = result.slice(-collectionPdas.length);
    const mints = Object.fromEntries(unparsedMintAccounts.map(account => [account.publicKey.toString(), toMint(toMintAccount(account))]));
    return zipMap(unparsedAccounts, unparsedCollectionAccounts, (unparsedAccount, unparsedCollectionAccount) => {
      var _parsedAccount$data$t;

      const parsedAccount = parsedAccounts[unparsedAccount.publicKey.toString()];
      const collectionAccount = unparsedCollectionAccount ? parseCandyMachineCollectionAccount(unparsedCollectionAccount) : null;
      const tokenMintAddress = (_parsedAccount$data$t = parsedAccount.data.tokenMint) === null || _parsedAccount$data$t === void 0 ? void 0 : _parsedAccount$data$t.toString();
      return toCandyMachine(parsedAccount, unparsedAccount, collectionAccount, tokenMintAddress ? mints[tokenMintAddress] : null);
    });
  }
};

export { findCandyMachinesByPublicKeyFieldOperation, findCandyMachinesByPublicKeyFieldOperationHandler };
//# sourceMappingURL=findCandyMachinesByPublicKeyField.mjs.map
