import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import useFetchCallback from "@/hooks/useFetchCallback";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import {
  getuserInfo,
  login,
  logout,
  TLogin,
  TRegister,
  register,
} from "@/Api/auth";

type AuthContextType = {
  user: User | null | undefined;
  isAuthorized: boolean;
  authState: ReturnType<typeof useFetchCallback<User | null>>;
  loginState: ReturnType<typeof useFetchCallback<TLogin>>;
  registerState: ReturnType<typeof useFetchCallback<TRegister>>;
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
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const authState = useFetchCallback(getuserInfo);
  const loginState = useFetchCallback<TLogin>(login);
  const registerState = useFetchCallback<TRegister>(register);

  const logoutState = () => {
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
    if (loginState.data) setUser(loginState.data.user);
  }, [loginState.data]);

  useEffect(() => {
    if (registerState.data) setUser(registerState.data.user);
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
