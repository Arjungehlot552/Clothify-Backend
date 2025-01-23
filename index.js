import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv for environment variables
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/razorpay", razorpayRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
