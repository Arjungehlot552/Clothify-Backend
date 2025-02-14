import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb+srv://arjungehlot552:L12434IpTjj8RKsL@cluster0.8ggwm.mongodb.net/test";  
    // Explicitly use "test" since your collection is inside "test.addresses"

    const conn = await mongoose.connect(uri);

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Using Database: ${conn.connection.name}`); // Check database name
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
