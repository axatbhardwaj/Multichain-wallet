import Router from "express";
import validateMnemonicPhrase from "../middlewares/validateMnemonicPhrase.js";
import { createWallet, getWallet, importWallet, addAccount, deleteWallet } from "../controllers/walletController.js";
const router = Router();

//get requests
router.get("/api/v1/wallet", createWallet);
router.get(
  "/api/v1/wallets/:mnemonicPhrase",
  validateMnemonicPhrase,
  getWallet,
);
// router.get("/api/v1/wallet/balance/:address", getBalance);

// post requests
router.post(
  "/api/v1/wallet/import:mnemonicPhrase",
  validateMnemonicPhrase,
  importWallet,
);

router.post("/api/v1/wallet/addaccount/:index", addAccount);

//delete requests
router.delete(
  "/api/v1/wallet/:mnemonicPhrase",
  validateMnemonicPhrase,
  deleteWallet,
);

export default router;