import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import router from "./routes";
import headerMiddleware, { corsOptionsMiddleware } from "./middlewares/cors";
import cookieParser from "cookie-parser";

config();

const app: Express = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("Port is not defined");

app.use(corsOptionsMiddleware);
app.use(headerMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/health", (_: Request, res: Response) => {
  res.json({ health: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
