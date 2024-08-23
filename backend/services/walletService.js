import { ethers } from "ethers";

const HDNodeWallet = ethers.HDNodeWallet;
const rpcUrl = process.env.RPC_URL;

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

async function getBalanceRpc(address) {

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  let balance = await provider.getBalance(address);
  balance = ethers.formatEther(balance);
  // console.log(balance);
  return balance;
}

export { createKeyPair, getBalanceRpc };
