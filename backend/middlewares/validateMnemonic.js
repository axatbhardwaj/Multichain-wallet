const { isValidPhrase } = require('../services/walletService');

// Middleware to validate mnemonic phrase

const validateMnemonic = async (req, res, next) => {
    const { mnemonicPhrase } = req.body;

    if (!await isValidPhrase(mnemonicPhrase)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid mnemonic phrase'
        });
    }

    next();
}

module.exports = validateMnemonic;