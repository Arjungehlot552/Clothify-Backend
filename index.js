import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import shopVerificationRoutes from "./routes/shopVerificationRoutes.js"; // ✅ Fixed Import
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://localmart-azure.vercel.app/", // Supports .env FRONTEND_URL
    credentials: true, // Allow cookies and authentication headers
  })
);

// ✅ Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data

// ✅ Static Folder for Uploaded Files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

// ✅ API Routes
app.get("/", (req, res) => res.send("🚀 Server is Running!"));

// ✅ All API routes
app.use("/api/auth", authRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/verify-shop", shopVerificationRoutes); // ✅ Fixed Route

// ✅ Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on: http://localhost:${port}`);
});
