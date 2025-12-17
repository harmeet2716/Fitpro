import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password, number } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "Email already exists" });

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ firstname, lastname, email, password: hashPass, number });
    await newUser.save();

    res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        number: user.number
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
