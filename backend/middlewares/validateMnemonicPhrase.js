import { HDNodeWallet } from 'ethers';
// Middleware to validate mnemonic phrase

const validateMnemonic = (req, res, next) => {
    const { mnemonicPhrase } = req.body;

    if (!HDNodeWallet.isValidMnemonic(mnemonicPhrase)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid mnemonic phrase'
        });
    }

    next();
}


export default validateMnemonic;