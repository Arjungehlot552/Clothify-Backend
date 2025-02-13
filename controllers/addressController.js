import Address from "../models/addressModel.js";

// Save address to database
export const saveAddress = async (req, res) => {
  try {
    console.log("📩 Received Address Data:", req.body); // Log incoming data

    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();

    console.log("✅ Address Saved in DB:", savedAddress); // Log saved data
    res.status(201).json({ success: true, message: "Address stored successfully", data: savedAddress });
  } catch (error) {
    console.error("❌ Error Saving Address:", error.message);
    res.status(500).json({ error: "Failed to save address" });
  }
};

// Get all addresses
export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    console.log("📦 Fetched Addresses:", addresses); // Log fetched data
    res.status(200).json(addresses);
  } catch (error) {
    console.error("❌ Error Fetching Addresses:", error.message);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
};
