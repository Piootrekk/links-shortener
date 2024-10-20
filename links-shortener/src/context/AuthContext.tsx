import React, { createContext, useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import { TUserCredentials } from "@/schemas/authSchema";
import { getuserInfo, login, logout, register } from "@/Api/auth";
import useMultiFetches, { UseFetchMultiple } from "@/hooks/useMultiFetches";
import useInstantFetch from "@/hooks/useInstantFetch";
import { UnableToEstablishConnection } from "@/router/Pages/Error";

type MethodsTypes = {
  login: typeof login;
  logout: typeof logout;
  register: typeof register;
};

type AuthContextType = {
  user: UseFetchMultiple<TUserCredentials | null, MethodsTypes>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
};
type TAuthMethods = {
  login: (email: string, password: string) => Promise<TUserCredentials>;
  logout: () => Promise<null>;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<TUserCredentials>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const methods = {
    getuserInfo,
    login,
    logout,
    register,
  };

  const user = useMultiFetches<TUserCredentials | null, TAuthMethods>(methods);
  const baseUserInfo = useInstantFetch(getuserInfo, []);

  useEffect(() => {
    if (baseUserInfo.data !== undefined) {
      user.setDataManually(baseUserInfo.data);
    }
  }, [baseUserInfo.data]);

  const handleLogin = async (email: string, password: string) => {
    await user.exec.login(email, password);
    if (user.data !== undefined) {
      baseUserInfo.setDataManually(user.data);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await user.exec.register(email, password, confirmPassword);
    if (user.data !== undefined) {
      baseUserInfo.setDataManually(null);
    }
  };

  const handleLogout = async () => {
    await user.exec.logout();
    if (user.data !== undefined) {
      baseUserInfo.setDataManually(null);
    }
  };

  if (baseUserInfo.isLoading) {
    return <RouterProvider router={routerSkeleton} />;
  }

  if (baseUserInfo.error) {
    return <UnableToEstablishConnection />;
  }
  if (baseUserInfo.data === undefined) {
    return null;
  }

  if (user !== undefined) {
    return (
      <AuthContext.Provider
        value={{
          user: user,
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
