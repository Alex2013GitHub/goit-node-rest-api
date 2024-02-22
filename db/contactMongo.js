import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_URL } = process.env;

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database is running");
  } catch (error) {
    console.log(error);
  }
};
