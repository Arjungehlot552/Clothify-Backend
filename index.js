import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ FIX: CORS Configuration to allow frontend requests
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    credentials: true, // Allow cookies and authentication headers
  })
);

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// ✅ API Routes
app.get("/", (req, res) => res.send("🚀 Server is Running!"));

app.use("/api/auth", authRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/shop", shopRoutes); // ✅ Ensure this route is working

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on: http://localhost:${port}`);
});
