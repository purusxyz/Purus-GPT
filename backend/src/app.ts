import express from 'express';
import { config } from 'dotenv';
// import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
config();

const app = express();

const isProd = process.env.NODE_ENV === "production";
// middlewares
app.use(cors({ origin: isProd ? process.env.CLIENT_URL : "http://localhost:5173",
     credentials: true }));
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