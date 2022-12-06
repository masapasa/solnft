import { ConfirmOptions } from '@solana/web3.js';
import type { Metaplex } from '../../../Metaplex';
import { TransactionBuilder } from '../../../utils';
import { Operation, OperationHandler, Signer, SolAmount, SplTokenAmount } from '../../../types';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { AuctionHouse } from '../models';
declare const Key: "WithdrawFromTreasuryAccountOperation";
/**
 * Transfers funds from Auction House Treasury Wallet to the Treasury Withdrawal Destination Wallet set on an Auction House creation.
 * By default Treasury Withdrawal Destination Wallet is set to `metaplex.identity()`.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .withdrawFromTreasuryAccount({ auctionHouse, amount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const withdrawFromTreasuryAccountOperation: import("../../../types").OperationConstructor<WithdrawFromTreasuryAccountOperation, "WithdrawFromTreasuryAccountOperation", WithdrawFromTreasuryAccountInput, WithdrawFromTreasuryAccountOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type WithdrawFromTreasuryAccountOperation = Operation<typeof Key, WithdrawFromTreasuryAccountInput, WithdrawFromTreasuryAccountOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type WithdrawFromTreasuryAccountInput = {
    /**
     * The Auction House from which to transfer funds from the treasury wallet to the treasury withdrawal destination wallet.
     * `treasuryWithdrawalDestinationAddress` is set on Auction House creation, but you can also change it via the `update` operation.
     */
    auctionHouse: Pick<AuctionHouse, 'treasuryMint' | 'authorityAddress' | 'treasuryWithdrawalDestinationAddress' | 'address'>;
    /**
     * The Auction House authority.
     *
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer;
    /**
     * The Signer paying for the transaction fee.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * Amount of funds to withdraw.
     * This can either be in SOL or in the SPL token used by the Auction House as a currency.
     */
    amount: SolAmount | SplTokenAmount;
    /** A set of options to configure how the transaction is sent and confirmed. */
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type WithdrawFromTreasuryAccountOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const withdrawFromTreasuryAccountOperationHandler: OperationHandler<WithdrawFromTreasuryAccountOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type WithdrawFromTreasuryAccountBuilderParams = Omit<WithdrawFromTreasuryAccountInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type WithdrawFromTreasuryAccountBuilderContext = Omit<WithdrawFromTreasuryAccountOutput, 'response'>;
/**
 * Transfers funds from Auction House Treasury Wallet to the Treasury Withdrawal Destination Wallet set on an Auction House creation.
 * By default Treasury Withdrawal Destination Wallet is set to `metaplex.identity()`.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .withdrawFromTreasuryAccount({ auctionHouse, amount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const withdrawFromTreasuryAccountBuilder: (metaplex: Metaplex, params: WithdrawFromTreasuryAccountBuilderParams) => TransactionBuilder<WithdrawFromTreasuryAccountBuilderContext>;
export {};
