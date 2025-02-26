import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const frontend = process.env.EXPRESS_URL_FRONT;

if (!frontend) {
  throw new Error("FRONTEND_URL is not defined");
}

const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};
const isProduction = process.env.NODE_ENV === "production";

export const corsOptionsMiddleware = cors({
  origin: isProduction
    ? frontend
    : ["http://localhost:5173", "http://localhost:3000"],
  allowedHeaders: "Content-Type, Authorization",
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  credentials: true,
});

export default headerMiddleware;
