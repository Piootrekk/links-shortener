import { config } from "dotenv";
import argon2, { Options } from "argon2";

config();

const SECRET = process.env.EXPRESS_CRYPT_SECRET || "";
if (!SECRET) throw new Error("No secret provided");

const argon2Config: Options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 1,
};

const generateHash = async (password: string) => {
  const passwordWithSecret = password + SECRET;

  return await argon2.hash(passwordWithSecret, argon2Config);
};

const compareHash = async (password: string, hash: string) => {
  const passwordWithSecret = password + SECRET;
  return await argon2.verify(hash, passwordWithSecret);
};

export { generateHash, compareHash };
