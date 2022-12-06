import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import type { Metaplex } from '../../../Metaplex';
import { TransactionBuilder } from '../../../utils';
import { Operation, OperationHandler, Signer, SplTokenAmount, SolAmount } from '../../../types';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { AuctionHouse } from '../models';
declare const Key: "WithdrawFromBuyerAccountOperation";
/**
 * Withdraws funds from the user's buyer escrow account for the given auction house.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .withdraw({ auctionHouse, buyer, amount })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const withdrawFromBuyerAccountOperation: import("../../../types").OperationConstructor<WithdrawFromBuyerAccountOperation, "WithdrawFromBuyerAccountOperation", WithdrawFromBuyerAccountInput, WithdrawFromBuyerAccountOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type WithdrawFromBuyerAccountOperation = Operation<typeof Key, WithdrawFromBuyerAccountInput, WithdrawFromBuyerAccountOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type WithdrawFromBuyerAccountInput = {
    /** The Auction House from which escrow buyer withdraws funds. */
    auctionHouse: Pick<AuctionHouse, 'address' | 'authorityAddress' | 'hasAuctioneer' | 'treasuryMint' | 'feeAccountAddress'>;
    /**
     * The buyer who withdraws funds.
     *
     * There must be one and only one signer; Authority or Seller must sign.
     *
     * @defaultValue `metaplex.identity()`
     */
    buyer?: PublicKey | Signer;
    /**
     * The Signer paying for the creation of all accounts
     * required to deposit to the buyer's account.
     * This account will also pay for the transaction fee.
     *
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * The Authority key.
     * It is required when the buyer is not a signer.
     * There must be one and only one signer; Authority or Buyer must sign.
     *
     * @defaultValue Defaults to not being used.
     */
    authority?: Signer;
    /**
     * The Auctioneer authority key.
     * It is required when Auction House has Auctioneer enabled.
     *
     * @defaultValue No default value.
     */
    auctioneerAuthority?: Signer;
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
export declare type WithdrawFromBuyerAccountOutput = {
    /** The blockchain response from sending and confirming the transaction. */
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const withdrawFromBuyerAccountOperationHandler: OperationHandler<WithdrawFromBuyerAccountOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type WithdrawFromBuyerAccountBuilderParams = Omit<WithdrawFromBuyerAccountInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type WithdrawFromBuyerAccountBuilderContext = Omit<WithdrawFromBuyerAccountOutput, 'response'>;
/**
 * Withdraws funds from the user's buyer escrow account to the given auction house.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .withdrawFromBuyerAccountBuilder({ auctionHouse, buyer, amount });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
export declare const withdrawFromBuyerAccountBuilder: (metaplex: Metaplex, params: WithdrawFromBuyerAccountBuilderParams) => TransactionBuilder<WithdrawFromBuyerAccountBuilderContext>;
export {};
