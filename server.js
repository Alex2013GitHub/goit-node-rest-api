import mongoose from "mongoose";
import { app } from "./app.js";
import { connectMongo } from "./db/contactMongo.js";

const { PORT } = process.env;

mongoose.set("strictQuery", true);

const startServer = async () => {
  try {
    await connectMongo()
    app.listen(PORT || 3000, () => {
            console.log("Database connection successful");
          });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();