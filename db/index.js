import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config(); // Ensure environment variables are loaded

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`\n ✅ MongoDB Connected Successfully! DB Host: ${connection.connection.host}`);
  } catch (error) {
    console.log("❌ MONGODB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
