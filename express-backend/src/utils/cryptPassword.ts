import bcrypt from "bcrypt";

const generateHash = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { generateHash, compareHash };
