import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const payload = { userId: newUser._id };
        const secretKey = process.env.JWT_SECRET || "nothing"; // Store in .env
        const options = { expiresIn: "1d" };

        const token = jwt.sign(payload, secretKey, options);

        // Convert user to an object and remove password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: userResponse, // ✅ Password removed
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const existingUser = await User.findOne({ email }).select("+password"); // Get password for comparison

        if (!existingUser) {
            return res.status(400).json({ message: "User not found with this email" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = { userId: existingUser._id };
        const secretKey = process.env.JWT_SECRET || "nothing";
        const options = { expiresIn: "1d" };

        const token = jwt.sign(payload, secretKey, options);

        // Convert user to an object and remove password
        const userResponse = existingUser.toObject();
        delete userResponse.password;

        res.json({
            message: "User logged in successfully",
            token,
            user: userResponse, // ✅ Password removed
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};




export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
