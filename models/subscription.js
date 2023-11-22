import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    planId:{ type: String, required:true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'active' },
    expireAt:{ type: Date, required: true }
  }, { timestamps: true });
  
export default model('Subscription', subscriptionSchema);
  