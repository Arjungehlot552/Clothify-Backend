import fs from "fs";
import path from "path";
import ShopVerification from "../models/ShopVerification.js";

export const submitVerification = async (req, res) => {
  try {
    console.log("🚀 API hit: /api/verify-shop");

    if (!req.files || !req.body.shopAddress) {
      console.log("❌ Missing files or shopAddress");
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { shopAddress } = req.body;
    const files = req.files;

    console.log("🟢 Uploaded Files:", files);
    console.log("🟢 Shop Address:", shopAddress);

    if (Object.keys(files).length === 0) {
      console.log("❌ No files uploaded");
      return res.status(400).json({ message: "No files uploaded" });
    }

    // ✅ Extract file paths
    const uploadedFiles = {};
    Object.keys(files).forEach((key) => {
      uploadedFiles[key] = `uploads/shop_verify/${files[key][0].filename}`; // Save path
    });

    console.log("📂 Files stored:", uploadedFiles);

    // ✅ Save to MongoDB
    const newVerification = new ShopVerification({
      aadhar: uploadedFiles.aadhar || "",
      rentalAgreement: uploadedFiles.rentalAgreement || "",
      shopAddress,
      shopPhoto: uploadedFiles.shopPhoto || "",
      businessCertificate: uploadedFiles.businessCertificate || "",
      shopLicense: uploadedFiles.shopLicense || "",
      gstCertificate: uploadedFiles.gstCertificate || "",
      isVerified: false,
    });

    await newVerification.save();

    console.log("✅ Data stored in MongoDB:", newVerification);

    res.status(201).json({ message: "Verification details submitted successfully!", data: newVerification });
  } catch (error) {
    console.error("❌ Error submitting verification:", error);
    res.status(500).json({ message: "Server error! Please try again later.", error });
  }
};
