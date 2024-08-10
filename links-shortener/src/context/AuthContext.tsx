import React, { createContext, useContext, useEffect } from "react";
import { getCurrentUser, signOut } from "@/supabase/auth";
import { User } from "@supabase/supabase-js";
import useFetchCallback from "@/hooks/useFetchCallback";

type AuthContextType = {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthorized: boolean | undefined;
  getUser: (...args: any[]) => Promise<void>;
  logout: () => void;
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
  const { data, isLoading, execute } = useFetchCallback(getCurrentUser);

  useEffect(() => {
    const fetchUser = async () => {
      await execute();
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const logout = async () => {
    await signOut();
    await execute();
  };

  if (isLoading) {
    return <div>Loading...</div>; // Skeleton or spinner will be
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
