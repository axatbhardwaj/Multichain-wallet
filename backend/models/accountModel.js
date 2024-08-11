const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'An account must have an address']
    },
    publickey: {
        type: String,
        required: [true, 'An account must have a public key']
    },
    privatekey: {
        type: String,
        required: [true, 'An account must have a private key']
    }
})

const account = mongoose.model('Account', accountSchema);
module.exports = account;