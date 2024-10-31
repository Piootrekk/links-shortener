import axiosInstance from "./axios";
import { TLogout, TUserCredentials } from "../schemas/authSchema";

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<TUserCredentials>("/login", {
    email,
    password,
  });
  return response.data;
};

const register = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axiosInstance.post<TUserCredentials>("/register", {
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post<TLogout>("/logout");
  return response.data;
};

const getuserInfo = async () => {
  console.log(import.meta.env.VITE_APP_MODE);
  const response = await axiosInstance.get<TUserCredentials | null>("/user");
  return response.data;
};

export { login, register, logout, getuserInfo };
export type { TUserCredentials };
