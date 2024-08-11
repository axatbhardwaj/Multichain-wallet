const walletModel = require('../models/walletModel');
const accountModel = require('../models/accountModel');
const { createKeyPair } = require('../services/walletService');

// Create a new wallet
exports.createWallet = async (req, res) => {
    const generatedWallet = await createKeyPair();

    const address = generatedWallet.address;
    const publicKey = generatedWallet.publicKey;
    const privateKey = generatedWallet.privateKey;
    const mnemonicPhrase = generatedWallet.mnemonicPhrase;

    const account = await accountModel.create({
        address: address,
        publicKey: publicKey,
        privateKey: privateKey
    });

    const newWallet = await walletModel.create({
        numberOfAccounts: 1,
        accounts: [account._id],
        mnemonic: mnemonicPhrase
    });

    await newWallet.save();

    res.status(201).json({
        status: 'success',
        data: {
            wallet: newWallet
        }
    });
}

//return the wallet and its accounts
exports.getWallet = async (req, res) => {
    const { address } = req.params;

    const wallet = await walletModel.findOne({ mnemonic: address });

    res.status(200).json({
        status: 'success',
        data: {
            wallet: wallet
        }
    });
}

exports.importWallet = async (req, res) => {
    const { mnemonicPhrase } = req.body;

    const importedWallet = await createKeyPair(mnemonicPhrase);

    //importedWallet.

    const account = await accountModel.create({
        address: importedWallet.address,
        publicKey: importedWallet.publicKey,
        privateKey: importedWallet.privateKey
    });

    const newWallet = await walletModel.create({
        numberOfAccounts: 1,
        accounts: [account._id],
        mnemonic: mnemonicPhrase
    });

    await newWallet.save();

    res.status(201).json({
        status: 'success',
        data: {
            wallet: newWallet
        }
    });
}

exports.addAccount = async (req, res) => {
    const { mnemonicPhrase } = req.body;

    const wallet = await walletModel.findOne({ mnemonic: mnemonicPhrase });
    const numberOfAccounts = wallet.numberOfAccounts;

    // fist account is at index 0
    const index = numberOfAccounts;

    const newAccount = await createKeyPair(mnemonicPhrase, index);

    const address = newAccount.address;
    const publicKey = newAccount.publicKey;
    const privateKey = newAccount.privateKey;

    const account = await accountModel.create({
        address: address,
        publicKey: publicKey,
        privateKey: privateKey
    });

    const walletM = await walletModel.findOneAndUpdate({ mnemonic: mnemonic }, {
        $inc: { numberOfAccounts: 1 },
        $push: { accounts: account._id }
    });

    res.status(201).json({
        status: 'success',
        data: {
            wallet: wallet
        }
    });
}

exports.deleteWallet = async (req, res) => {
    const { mnemonic } = req.body;

    const deleteWallet = await walletModel.findOneAndDelete({ mnemonic: mnemonic });

    res.status(204).json({
        status: 'success',
        data: null
    });
}