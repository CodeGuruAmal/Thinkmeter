import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
