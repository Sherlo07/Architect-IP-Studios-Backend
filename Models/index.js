import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDB = async () => {
  try {
    // Check if MONGO_URI is provided
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    console.log("🔄 Attempting to connect to MongoDB...");
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`   Host: ${connection.connection.host}`);
    console.log(`   Database: ${connection.connection.name}`);
    console.log(`   Ready State: ${connection.connection.readyState}`);
  } catch (error) {
    console.error("❌ MONGODB connection error:", error.message);
    console.error("   Make sure your MONGO_URI is correct and includes:");
    console.error("   - Correct cluster URL");
    console.error("   - Username and password");
    console.error("   - Database name");
    console.error("   - Proper connection string format");
    process.exit(1);
  }
};

export default connectDB;
