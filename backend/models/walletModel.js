const mongoose = require('mongoose');
const accountModel = require('../models/accountModel');

const walletSchema = new mongoose.Schema({
    numberofaccounts: {
        type: Number,
        required: [true, 'A wallet must have at least one account']
    },
    accounts: {
        type: [accountModel.schema],
        required: [true, 'A wallet must have at least one account']
    },
    mnemonicPhrase: {
        type: String,
        required: [true, 'A wallet must have a mnemonic']
    }
});

const wallet = mongoose.model('Wallet', walletSchema);
module.exports = wallet;