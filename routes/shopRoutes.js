import express from "express";
import multer from "multer";
import { createShop } from "../controllers/shopController.js";
import Shop from "../models/Shop.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ GET: Fetch Shop Details
router.get("/", async (req, res) => {
  try {
    const shop = await Shop.findOne();
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(shop);
  } catch (error) {
    console.error("❌ Error fetching shop:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ POST: Create a new shop
router.post("/", upload.fields([{ name: "coverPhoto" }, { name: "profilePhoto" }]), createShop);

// ✅ PATCH: Update Shop Details with File Uploads
router.patch("/", upload.fields([{ name: "coverPhoto" }, { name: "profilePhoto" }]), async (req, res) => {
  try {
    let shop = await Shop.findOne();
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    // Update shop fields if provided
    shop.name = req.body.name || shop.name;
    shop.description = req.body.description || shop.description;
    shop.location = req.body.location ? JSON.parse(req.body.location) : shop.location;
   

    // Handle file uploads
    if (req.files["coverPhoto"]) {
      shop.coverPhoto = `/uploads/${req.files["coverPhoto"][0].filename}`;
    }

    if (req.files["profilePhoto"]) {
      shop.profilePhoto = `/uploads/${req.files["profilePhoto"][0].filename}`;
    }

    await shop.save();
    console.log("✅ Shop updated successfully:", shop);

    res.status(200).json({ message: "Shop updated successfully!", shop });
  } catch (error) {
    console.error("❌ Error updating shop:", error.message);
    res.status(500).json({ message: "Error updating shop", error: error.message });
  }
});

export default router;
