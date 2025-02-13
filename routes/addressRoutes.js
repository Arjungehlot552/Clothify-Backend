import express from "express";
import { saveAddress, getAllAddresses } from "../controllers/addressController.js";

const router = express.Router();

router.post("/", saveAddress);
router.get("/", getAllAddresses);

export default router;
