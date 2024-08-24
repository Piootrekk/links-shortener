import axiosInstance from "./axios";

type TLogout = {
  success: boolean;
};

type TUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  meta_role: string;
  email_verified: boolean;
  session: {
    access_token: string;
  };
};

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<TUser>("/login", {
    email,
    password,
  });
  if (response) {
    localStorage.setItem("authToken", response.data.session.access_token);
  }
  return response.data;
};

const register = async (email: string, password: string) => {
  const response = await axiosInstance.post<TUser>("/register", {
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
  const response = await axiosInstance<TUser | null>({
    method: "GET",
    url: "/user",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  return response.data;
};

export { login, register, logout, getuserInfo };
export type { TLogout, TUser };
