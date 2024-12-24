import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const MONGO_URI = process.env.MONGODB_URL as string;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
