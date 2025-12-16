import express from 'express';
import { config } from 'dotenv';
// import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
config();

const app = express();

const isProd = process.env.NODE_ENV === "production";

const CLIENT_URL = isProd
  ? process.env.CLIENT_URL
  : "http://localhost:5173";

// ─────────────────────────────────────────────
// CORS (Vercel-safe & credential-safe)
// ─────────────────────────────────────────────
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔴 REQUIRED for preflight requests on Vercel
app.options("*", cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove in production
// app.use(morgan('dev'));

app.use("/api/v1", appRouter);

// health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully" });
});

export default app;