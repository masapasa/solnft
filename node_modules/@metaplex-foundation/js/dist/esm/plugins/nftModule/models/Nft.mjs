import { toSft, isSftWithToken, toSftWithToken } from './Sft.mjs';
import assert from '../../../utils/assert.mjs';

/**
 * This model captures all the relevant information about an NFT
 * in the Solana blockchain. That includes the NFT's metadata account,
 * its mint account, its edition account and its off-chain JSON metadata.
 *
 * @group Models
 */

/** @group Model Helpers */
const isNft = value => typeof value === 'object' && value.model === 'nft';
/** @group Model Helpers */

function assertNft(value) {
  assert(isNft(value), `Expected Nft model`);
}
/** @group Model Helpers */

const toNft = (metadata, mint, edition) => ({ ...toSft(metadata, mint),
  model: 'nft',
  edition
});
/** @group Models */

/** @group Model Helpers */
const isNftWithToken = value => isNft(value) && 'token' in value;
/** @group Model Helpers */

function assertNftWithToken(value) {
  assert(isNftWithToken(value), `Expected Nft model with token`);
}
/** @group Model Helpers */

function assertNftOrSftWithToken(value) {
  assert(isNftWithToken(value) || isSftWithToken(value), `Expected Nft or Sft model with token`);
}
/** @group Model Helpers */

const toNftWithToken = (metadata, mint, edition, token) => ({ ...toSftWithToken(metadata, mint, token),
  model: 'nft',
  edition
});

export { assertNft, assertNftOrSftWithToken, assertNftWithToken, isNft, isNftWithToken, toNft, toNftWithToken };
//# sourceMappingURL=Nft.mjs.map
