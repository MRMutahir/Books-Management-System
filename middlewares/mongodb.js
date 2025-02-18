import mongoose from "mongoose";
import { envKeys } from "../config/keys.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(envKeys.dbUri);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
    }
};

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connection Established");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err);
});
