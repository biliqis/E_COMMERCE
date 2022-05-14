import mongoose, { Schema } from "mongoose";
export const TransactionSchema = new Schema({
	amount: {
		type: String,
	},

	userId: {
	 type: Schema.Types.ObjectId, ref: 'user' 
	},

	status: {
		type: String,
	},
    orderId : {
        type: Schema.Types.ObjectId, ref: 'Order'
    }


}, {
    timestamps:true
});

export const TransactionModel = mongoose.model("transaction", TransactionSchema);
