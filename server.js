import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import sanatize from "./middleware/sanatize.js";
import paymentRoute from "./routes/paymentRoute.js";
import userRoute from "./routes/userRoute.js"
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
const mongoLink=process.env.MONGODB_URI||"mongodb://127.0.0.1:27017";

app.use(cors());
app.use(sanatize);
app.use(express.static(path.join(__dirname, "./dist")));

try{
    mongoose.connect(mongoLink,{
        dbName: "paymentDB"
    });
    const db = mongoose.connection;
    db.once('open', () => {console.log('Connected to MongoDB!')});
}catch(err){
    console.log("Connection to database failed", err);
}


app.use("/api/payment",paymentRoute);
app.use("/api/user",userRoute);


app.get("*/", function (req, res) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
  });

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});