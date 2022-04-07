import  mongoose, {Schema} from "mongoose";
export const cartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  totalPrice: {
    type: Number,
  },

  quantityInStock: {
    type: Number,
    default:1
  },
});



export const cartModel = mongoose.model('Cart', cartSchema);
