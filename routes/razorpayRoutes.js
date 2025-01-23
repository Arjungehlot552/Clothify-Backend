import express from "express";
import { createOrder, fetchPayment } from "../controllers/razorpayController.js";

const router = express.Router();

// Route to create an order
router.post("/orders", createOrder);

// Route to fetch payment details
router.get("/payment/:paymentId", fetchPayment);

export default router;
