import { MetaplexPlugin } from '../../types';
import { PublicKey } from '@solana/web3.js';
/** @group Plugins */
export declare const guestIdentity: (publicKey?: PublicKey | undefined) => MetaplexPlugin;
