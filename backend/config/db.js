import mongoose from "mongoose";

const DB = async (MONGO_URL) => {
  try {
    if (!MONGO_URL) {
      throw new Error(
        "Database URL is missing! Please check your environment variables."
      );
    }

    await mongoose.connect(MONGO_URL);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default DB;
