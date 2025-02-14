import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ✅ Ensure the upload directory exists
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../uploads/shop_verify");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Upload directory created at:", uploadDir);
} else {
  console.log("✅ Upload directory already exists:", uploadDir);
}

// ✅ Define Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("🟢 Storing file in:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    console.log("📂 File will be saved as:", filename);
    cb(null, filename);
  },
});

// ✅ Allowed File Types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("❌ Invalid file type:", file.mimetype);
    cb(new Error("Invalid file type! Only JPG, PNG, and PDF are allowed."), false);
  }
};

// ✅ Multer Configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  fileFilter: fileFilter,
});

// ✅ Middleware for Multiple File Uploads
export const uploadFields = upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "rentalAgreement", maxCount: 1 },
  { name: "shopPhoto", maxCount: 1 },
  { name: "businessCertificate", maxCount: 1 },
  { name: "shopLicense", maxCount: 1 },
  { name: "gstCertificate", maxCount: 1 },
]);

export default upload;
