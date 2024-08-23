import { HDNodeWallet } from "ethers";

async function createKeyPair(mnemonicPhrase, index = 0) {
  let wallet;
  if (mnemonicPhrase) {
    wallet = HDNodeWallet.fromPhrase(
      mnemonicPhrase,
      "",
      `m/44'/60'/0'/0/${index}`,
    );
  } else {
    wallet = HDNodeWallet.createRandom();
    mnemonicPhrase = wallet.mnemonic.phrase;
  }

  const address = wallet.address;
  const publicKey = wallet.address;
  const privateKey = wallet.privateKey;

  return {
    mnemonicPhrase: mnemonicPhrase,
    address: address,
    publicKey: publicKey,
    privateKey: privateKey,
  };
}

export default {
  createKeyPair,
};
