import { User, Session, WeakPassword } from "@supabase/supabase-js";
import axiosInstance from "./axios";

type TRegister = {
  user: User;
  session: Session;
};

type TLogin = TRegister & {
  weakPassword?: WeakPassword;
};

type TLogout = {
  success: boolean;
};

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<TLogin>("/login", {
    email,
    password,
  });
  if (response) {
    console.log(response.data.session.access_token);
    localStorage.setItem("authToken", response.data.session.access_token);
  }
  return response.data;
};

const register = async (email: string, password: string) => {
  const response = await axiosInstance.post<TRegister>("/register", {
    email,
    password,
  });
  if (response) {
    localStorage.setItem("authToken", response.data.session.access_token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("authToken");
  return { success: true };
};

const getuserInfo = async () => {
  const response = await axiosInstance<User | null>({
    method: "GET",
    url: "/user",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  return response.data;
};

export { login, register, logout, getuserInfo };
export type { TLogin, TRegister, TLogout };
