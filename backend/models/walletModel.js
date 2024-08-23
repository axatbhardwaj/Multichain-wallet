import { Schema, model } from "mongoose";
import accountModel from "../models/accountModel.js";

const walletSchema = new Schema({
  numberOfAccounts: {
    type: Number,
    default: 1,
    unique: true,
    // required: [true, "A wallet must have at least one account"],
  },
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: accountModel,
    required: [true, "A wallet must have at least one account"],
  }],

  mnemonicPhrase: {
    type: String,
    required: [true, "A wallet must have a mnemonic"],
  },
});

const walletModel = model("Wallet", walletSchema);
export default walletModel;