import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      keepAlive: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    console.log(" Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

// Reconnect if disconnected
mongoose.connection.on("disconnected", () => {
  console.log(" MongoDB Disconnected! Reconnecting...");
  connectDB();
});

export default connectDB;
