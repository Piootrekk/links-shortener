import React, { createContext, useContext, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import useFetchCallback from "@/hooks/useFetchCallback";
import { RouterProvider } from "react-router-dom";
import routerSkeleton from "@/router/skeletonRouter";
import { getuserInfo, logout as logoutAuth } from "@/Api/auth";

type AuthContextType = {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthorized: boolean | undefined;
  getUser: (...args: any[]) => Promise<void>;
  logout: () => Promise<void>;
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
  const { data, isLoading, execute } = useFetchCallback(getuserInfo);

  useEffect(() => {
    const fetchUser = async () => {
      await execute();
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const logout = async () => {
    const response = logoutAuth();
    if (response.success) {
      await execute();
    }
  };

  if (isLoading) {
    return <RouterProvider router={routerSkeleton} />;
  }

  if (data !== undefined) {
    return (
      <AuthContext.Provider
        value={{
          user: data,
          isLoading,
          isAuthorized: Boolean(data),
          getUser: execute,
          logout,
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
