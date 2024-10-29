import { createContext, useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import { TLogout, TUserCredentials } from "@/schemas/authSchema";
import { getuserInfo, login, logout, register } from "@/api/auth";
import useMultiFetches, { UseFetchMultiple } from "@/hooks/useMultiFetches";
import useInstantFetch from "@/hooks/useInstantFetch";
import { UnableToEstablishConnection } from "@/router/Pages/Error";
import { toast } from "sonner";

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
  summonToast: () => void;
};

type TAuthMethods = {
  login: (email: string, password: string) => Promise<TUserCredentials>;
  logout: () => Promise<TLogout>;
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
  const [toastState, setToastState] = useState(false);

  useEffect(() => {
    if (baseUserInfo.data !== undefined) {
      user.setDataManually(baseUserInfo.data);
    }
  }, [baseUserInfo.data]);

  useEffect(() => {
    if (user.error !== null && toastState) {
      toast.error(user.error.message);
      setToastState(false);
    }
    if (user.data && !user.error && toastState) {
      baseUserInfo.setDataManually(user.data);
      toast.success("Logged in successfully");
    }
    if (user.data === null && !user.error && toastState) {
      baseUserInfo.setDataManually(null);
      toast.success("Logged out successfully");
    }
  }, [user.error, user.data]);

  const summonToast = () => {
    setToastState(true);
  };

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
          summonToast,
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
