import type { MetaplexPlugin } from '../../types';
import { AuctionHouseClient } from './AuctionHouseClient';
/** @group Plugins */
export declare const auctionHouseModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        auctionHouse(): AuctionHouseClient;
    }
}
