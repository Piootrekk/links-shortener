import React, { createContext, PropsWithChildren, useContext } from "react";
import useFetchMultiple from "@/hooks/useFetchCallback";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import { TUserCredentials } from "@/schemas/authSchema";
import { login, logout, register } from "@/Api/auth";

type AuthContextType = {
  user: ReturnType<typeof useFetchMultiple<TUserCredentials>>;
  isAuthorized: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
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
  const user = useFetchMultiple<TUserCredentials>();

  const handleLogin = async (email: string, password: string) => {
    await user.execute(login, email, password);
  };

  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await user.execute(register, email, password, confirmPassword);
  };

  const handleLogout = async () => {
    await user.execute(logout);
  };

  if (user.isLoading || user.error) {
    return <RouterProvider router={routerSkeleton} />;
  }

  if (user !== undefined) {
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthorized: Boolean(user),
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
