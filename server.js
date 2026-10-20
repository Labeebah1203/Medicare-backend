import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI ? "found" : "NOT found");
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Medicare API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
