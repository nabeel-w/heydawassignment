import { Schema, model } from "mongoose";

const couponSchema = new Schema({
    code: { type: String, unique: true, required: true },
    discountPercentage: { type: Number, required: true },
    valid: { type: Boolean, default: true }
  }, { timestamps: true });
  
  export default model('Coupon', couponSchema);