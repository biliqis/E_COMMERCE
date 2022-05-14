import mongoose, { Schema } from "mongoose";
export const ProductSchema = new Schema({
  productName: {
    type: String,
  },

  Description: {
    type: String,
  },

  price: {
    type: Number,
  },

  images: {
    type: [String],
  },

  quantityInStock: {
    type: Number,
  },

  material: {
    type: String,
  },

  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

export const ProductModel = mongoose.model("product", ProductSchema);
