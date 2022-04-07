import mongoose from "mongoose";
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.ATLAS_CONNECTION_STRING || "");
		console.log("Connected to DB");
	} catch (e) {
		throw e;
	}
};

export default connectDB;