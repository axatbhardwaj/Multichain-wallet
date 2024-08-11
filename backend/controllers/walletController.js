const walletModel = require('../models/walletModel');
const accountModel = require('../models/accountModel');
const { createKeyPair } = require('../services/walletService');

// Create a new wallet
exports.createWallet = async (req, res) => {
    try {
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
            mnemonicPhrase: mnemonicPhrase
        });

        await newWallet.save();

        res.status(201).json({
            status: 'success',
            data: {
                wallet: newWallet
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error
        });
    }
}

//return the wallet and its accounts
exports.getWallet = async (req, res) => {
    try {
        const { mnemonicPhrase } = req.params;

        const wallet = await walletModel.findOne({ mnemonicPhrase: mnemonicPhrase });

        res.status(200).json({
            status: 'success',
            data: {
                wallet: wallet
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error
        });
    }
}

exports.importWallet = async (req, res) => {
    try {
        const { mnemonicPhrase } = req.body;

        const importedWallet = await createKeyPair(mnemonicPhrase);

        const account = await accountModel.create({
            address: importedWallet.address,
            publicKey: importedWallet.publicKey,
            privateKey: importedWallet.privateKey
        });

        const newWallet = await walletModel.create({
            numberOfAccounts: 1,
            accounts: [account._id],
            mnemonicPhrase: mnemonicPhrase
        });

        await newWallet.save();

        res.status(201).json({
            status: 'success',
            data: {
                wallet: newWallet
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error
        });
    }
}

exports.addAccount = async (req, res) => {
    try {

        const { mnemonicPhrase } = req.body;

        const wallet = await walletModel.findOne({ mnemonicPhrase: mnemonicPhrase });
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

        const walletM = await walletModel.findOneAndUpdate({ mnemonicPhrase: mnemonicPhrase }, {
            $inc: { numberOfAccounts: 1 },
            $push: { accounts: account._id }
        });

        res.status(201).json({
            status: 'success',
            data: {
                wallet: wallet
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error
        });
    }
}


exports.deleteWallet = async (req, res) => {
    try {
        const { mnemonicPhrase } = req.body;

        const deleteWallet = await walletModel.findOneAndDelete({ mnemonicPhrase: mnemonicPhrase });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error
        });

    }
}