import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchCallback from "@/hooks/useFetchCallback";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import { getuserInfo, login, logout, register, TUser } from "@/Api/auth";

type AuthContextType = {
  user: TUser | null | undefined;
  isAuthorized: boolean;
  authState: ReturnType<typeof useFetchCallback<TUser | null>>;
  loginState: ReturnType<typeof useFetchCallback<TUser>>;
  registerState: ReturnType<typeof useFetchCallback<TUser>>;
  logoutState: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null | undefined>(undefined);
  const authState = useFetchCallback(getuserInfo);
  const loginState = useFetchCallback<TUser>(login);
  const registerState = useFetchCallback<TUser>(register);

  const logoutState = async () => {
    const isOut = logout();
    if (isOut.success) {
      setUser(null);
      authState.execute();
    }
  };

  useEffect(() => {
    authState.execute();
  }, []);

  useEffect(() => {
    if (authState.data !== undefined) setUser(authState.data);
  }, [authState.data]);

  useEffect(() => {
    if (loginState.data) {
      setUser(loginState.data);
      authState.execute();
    }
  }, [loginState.data]);

  useEffect(() => {
    if (registerState.data) {
      setUser(registerState.data);
      authState.execute();
    }
  }, [registerState.data]);

  if (authState.isLoading) {
    return <RouterProvider router={routerSkeleton} />;
  }

  if (user !== undefined) {
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthorized: Boolean(user),
          authState,
          loginState,
          registerState,
          logoutState,
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
