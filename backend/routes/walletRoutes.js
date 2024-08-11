const express = require('express');
const validateMnemonicPhrase = require('../middlewares/validateMnemonicPhrase');
const walletController = require('../controllers/walletController');
const router = express.Router();

//get requests 
router.get("api/v1/wallet", walletController.createWallet);
router.get("/api/v1/wallets/:mnemonicPhrase", validateMnemonicPhrase, walletController.getWallet);
router.get("/api/v1/wallet/:address/balance", walletController.getBalance);


// post requests
router.post("/api/v1/wallet/import:mnemonicPhrase", validateMnemonicPhrase, walletController.importWallet);
router.post("/api/v1/wallet/addaccount/:index", walletController.addAccount);

//delete requests
router.delete("/api/v1/wallet/:mnemonicPhrase", validateMnemonicPhrase, walletController.deleteWallet);

module.exports = router;