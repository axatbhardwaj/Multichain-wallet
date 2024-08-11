const express = require('express');

const walletController = require('../controllers/walletController');
const router = express.Router();

//get requests 
router.get("api/v1/wallet", walletController.createWallet);
router.get("/api/v1/wallets/:mnemonicPhrase", walletController.getWallet);
router.get("/api/v1/wallet/:address/balance", walletController.getBalance);


// post requests
router.post("/api/v1/wallet/import:mnemonicPhrase", walletController.importWallet);
router.post("/api/v1/wallet/addaccount/:index", walletController.addAccount);

//delete requests
router.delete("/api/v1/wallet/:mnemonicPhrase", walletController.deleteWallet);

module.exports = router;