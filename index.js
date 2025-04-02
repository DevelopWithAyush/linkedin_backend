import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./utility/features.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(cookieParser());

connectDB(process.env.MONGO_URI);
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
}));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


