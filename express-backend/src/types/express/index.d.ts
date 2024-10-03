import * as express from "express";
import { TUserCredentials } from "../../schemas/authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: TUserCredentials;
    }
  }
}
