import { number } from "joi";
import mongoose, { Schema } from "mongoose";
import { TransactionStatusEnum } from "./transaction.enum";
export const TransactionSchema = new Schema(
  {
    amount: {
      type: String,
    },
    TransactionId: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    transactionStatus: {
		type: String,
		enum: TransactionStatusEnum
	},

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

export const TransactionModel = mongoose.model(
  "transaction",
  TransactionSchema
);
