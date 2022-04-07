import { string } from "joi";
import mongoose, { Schema } from "mongoose";
export const UserSchema = new Schema({
	firstName: {
		type: String,
	},

	lastName: {
		type: String,
	},

	username: {
		type: String,
	},

	wishList: {
		type: String,
	},

	email: {
		type: String,
	},

	phonenumber: {
		type: String,
	},

	image: {
		type: String,
	},

	password: {
		type: String,
	},

	role: {
		type: String,
	},
});

export const UserModel = mongoose.model("user", UserSchema);
