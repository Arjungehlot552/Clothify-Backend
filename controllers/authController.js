import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { admin, shopkeeper } from "../constants/role.js";
// Sign up function
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let role = "user"; // Default role

    const isAdmin = admin.some(
      (user) =>
        user.email === email &&
        user.username === username &&
        user.password === password
    );
    const isShopkeeper = shopkeeper.some(
      (user) =>
        user.email === email &&
        user.username === username &&
        user.password === password
    );

    if (isAdmin) {
      role = "admin";
    } else if (isShopkeeper) {
      role = "shopkeeper";
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with hashed password
    const newUser = await User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Respond with success and new user data
    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    // Handle errors gracefully
    res
      .status(500)
      .json({ message: "Error creating user.", error: error.message });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and role
    const user = await User.findOne({ email});
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or role mismatch." });
    }

    // Compare provided password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with success and the JWT token
    res.status(200).json({ message: "Login successful!", token , role: user.role });
  } catch (error) {
    // Handle errors gracefully
    res
      .status(500)
      .json({ message: "Error logging in.", error: error.message });
  }
};
