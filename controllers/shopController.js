import Shop from "../models/Shop.js";

export const createShop = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, description, location } = req.body;

    if (!name || !description || !location.city || !location.state ) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const coverPhoto = req.files?.coverPhoto ? `/uploads/${req.files.coverPhoto[0].filename}` : "";
    const profilePhoto = req.files?.profilePhoto ? `/uploads/${req.files.profilePhoto[0].filename}` : "";

    const newShop = new Shop({
      name,
      description,
      location,
      coverPhoto,
      profilePhoto,
    });

    const savedShop = await newShop.save();
    console.log("✅ Shop saved successfully:", savedShop);

    res.status(201).json({ message: "Shop saved successfully!", shop: savedShop });
  } catch (error) {
    console.error("❌ Error saving shop:", error);
    res.status(500).json({ message: "Failed to save shop", error });
  }
};
