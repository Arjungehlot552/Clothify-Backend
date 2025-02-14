import express from "express";
import { submitVerification } from "../controllers/shopVerificationController.js";
import { uploadFields } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadFields, submitVerification); // ✅ Fixed Route Path

export default router;
