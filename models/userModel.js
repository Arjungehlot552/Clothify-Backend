import mongoose from 'mongoose';

// Define the schema for User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email validation
        },
        message: "Invalid email format.",
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'shopkeeper'], // Add any roles you plan to use
      default: 'user',
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
