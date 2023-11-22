import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email Already Exists'],
        required:[true,'Email is Required']
    },
    password:{
        type:String
    }
});

export default model('User', userSchema);