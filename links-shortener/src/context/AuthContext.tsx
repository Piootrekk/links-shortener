import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import { TUserCredentials } from "@/schemas/authSchema";
import { getuserInfo, login, logout, register } from "@/Api/auth";
import useMultiFetches from "@/hooks/useMultiFetches";

type AuthContextType = {
  user: ReturnType<
    typeof useMultiFetches<TUserCredentials | null, TAuthMethods>
  >;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
};

type TAuthMethods = {
  getuserInfo: () => Promise<TUserCredentials | null>;
  login: (email: string, password: string) => Promise<TUserCredentials>;
  logout: () => Promise<null>;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<TUserCredentials>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const methods = {
    getuserInfo,
    login,
    logout,
    register,
  };

  const user = useMultiFetches<TUserCredentials | null, TAuthMethods>(methods);
  useEffect(() => {
    user.exec.getuserInfo();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    await user.exec.login(email, password);
  };

  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await user.exec.register(email, password, confirmPassword);
  };

  const handleLogout = async () => {
    await user.exec.logout();
  };

  if (user.isLoading || user.error || user === undefined) {
    return <RouterProvider router={routerSkeleton} />;
  }

  if (user !== undefined) {
    return (
      <AuthContext.Provider
        value={{
          user,
          handleLogin,
          handleRegister,
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;
export { useAuth };
export type { AuthContextType };
