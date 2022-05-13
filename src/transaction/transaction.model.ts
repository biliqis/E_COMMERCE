import mongoose, { Schema } from "mongoose";
import { StatusEnum } from "../user/enums/transaction.enum";
export const TransactionSchema = new Schema({
	amount: {
		type: String,
	},

	userId: {
	 type: Schema.Types.ObjectId, ref: 'user' 
	},

	status: {
		type: StatusEnum,
	},
    orderId : {
        type: Schema.Types.ObjectId, ref: 'Order'
    }


}, {
    timestamps:true
});

export const TransactionModel = mongoose.model("transaction", TransactionSchema);
