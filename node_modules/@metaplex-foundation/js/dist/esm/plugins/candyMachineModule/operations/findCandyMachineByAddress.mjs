import { toCandyMachineAccount, parseCandyMachineCollectionAccount } from '../accounts.mjs';
import { toCandyMachine } from '../models/CandyMachine.mjs';
import { findCandyMachineCollectionPda } from '../pdas.mjs';
import { assertAccountExists } from '../../../types/Account.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindCandyMachineByAddressOperation';
/**
 * Find an existing Candy Machine by its address.
 *
 * ```ts
 * const candyMachine = await metaplex.candyMachines().findbyAddress({ address }).run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findCandyMachineByAddressOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findCandyMachineByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const collectionPda = findCandyMachineCollectionPda(address);
    const accounts = await metaplex.rpc().getMultipleAccounts([address, collectionPda], commitment);
    const unparsedAccount = accounts[0];
    assertAccountExists(unparsedAccount);
    const account = toCandyMachineAccount(unparsedAccount);
    const collectionAccount = parseCandyMachineCollectionAccount(accounts[1]);
    const mint = account.data.tokenMint ? await metaplex.tokens().findMintByAddress({
      address: account.data.tokenMint
    }).run() : null;
    return toCandyMachine(account, unparsedAccount, collectionAccount, mint);
  }
};

export { findCandyMachineByAddressOperation, findCandyMachineByAddressOperationHandler };
//# sourceMappingURL=findCandyMachineByAddress.mjs.map
