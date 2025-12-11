import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import Owner from "./models/Owner.js";
import bcrypt from "bcryptjs";
import transactionRoutes from "./routes/transactionRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DEFAULT_OWNER_USERNAME = process.env.DEFAULT_OWNER_USERNAME || "owner";
const DEFAULT_OWNER_PASSWORD =
  process.env.DEFAULT_OWNER_PASSWORD || "Owner@123";

// Connect to DB
connectDB();

// Create default owner after DB is ready
mongoose.connection.once("open", async () => {
  console.log(" Checking default owner...");

  const existing = await Owner.findOne({ username: DEFAULT_OWNER_USERNAME });
  if (!existing) {
    const hashed = await bcrypt.hash(DEFAULT_OWNER_PASSWORD, 10);
    await Owner.create({
      username: DEFAULT_OWNER_USERNAME,
      password: hashed,
    });
    console.log(`Default owner created: ${DEFAULT_OWNER_USERNAME}`);
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/transports", transportRoutes);

// Test route
app.get("/", (req, res) => res.send("Vettai Fastag Backend is running"));

// Start server
app.listen(PORT, () => console.log(" Server running on port", PORT));
