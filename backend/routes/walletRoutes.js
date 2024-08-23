import Router from "express";
import validateMnemonicPhrase from "../middlewares/validateMnemonicPhrase.js";
import { createWallet, getWallet, importWallet, addAccount, deleteWallet, getBalance } from "../controllers/walletController.js";
const router = Router();

//get requests
router.get("/wallet", createWallet);

router.get(
  "/wallets/:mnemonicPhrase",
  validateMnemonicPhrase,
  getWallet,
);

router.get("/wallet/balance/:address", getBalance);

// post requests
router.post(
  "/wallet/import/:mnemonicPhrase",
  validateMnemonicPhrase,
  importWallet,
);

router.post("/wallet/addaccount/:index", addAccount);

//delete requests
router.delete(
  "/wallet/:mnemonicPhrase",
  validateMnemonicPhrase,
  deleteWallet,
);

export default router;