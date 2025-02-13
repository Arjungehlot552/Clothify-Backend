import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    description: { type: String, required: true }, 
    location: { 
      city: { type: String, required: true }, 
      state: { type: String, required: true } 
    }, 
    coverPhoto: { type: String }, // Cover photo path
    profilePhoto: { type: String } // Profile photo path
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
