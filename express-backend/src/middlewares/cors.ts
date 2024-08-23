import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const frontend = process.env.URL_FRONT;

if (!frontend) {
  throw new Error("FRONTEND_URL is not defined");
}

const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

export const corsOptionsMiddleware = cors({
  origin: frontend,
  allowedHeaders: "Content-Type,Authorization",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
});

export default headerMiddleware;
