import { Schema, model } from "mongoose";
import accountModel from "../models/accountModel.js";
const walletSchema = new Schema({
  numberofaccounts: {
    type: Number,
    required: [true, "A wallet must have at least one account"],
  },
  accounts: {
    type: [accountModel],
    required: [true, "A wallet must have at least one account"],
  },
  mnemonicPhrase: {
    type: String,
    required: [true, "A wallet must have a mnemonic"],
  },
});

const walletModel = model("Wallet", walletSchema);
export default walletModel;