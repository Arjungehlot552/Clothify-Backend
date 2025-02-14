import mongoose from "mongoose";

const shopVerificationSchema = new mongoose.Schema(
  {
    aadhar: String,
    rentalAgreement: String,
    shopAddress: { type: String, required: true },
    shopPhoto: String,
    businessCertificate: String,
    shopLicense: String,
    gstCertificate: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("ShopVerification", shopVerificationSchema);
