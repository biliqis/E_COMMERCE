import mongoose, { Schema } from "mongoose";
export const CommentSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId, ref: 'product',
  },

  comment:{
    type:String,
},

},
  { timestamps: true }
  );
  
export const CommentModel = mongoose.model("comment", CommentSchema);
