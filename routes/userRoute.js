import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email: email });
        if (userFound) {
            return res.status(409).json({ message: "This email is already in use." });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                email: email,
                password: hashedPassword
            });
            await user.save();
            return res.status(201).json({ id: user._id });
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
        return res.status(404).json({ message: "User doesn't exist" });
    }
    else {
        const success = await bcrypt.compare(password, userFound.password);
        if (!success) {
            return res.status(401).json({ message: "Wrong credentials" });
        }
        else {
            return res.status(200).json({ id: userFound._id });
        }
    }
});

export default router;