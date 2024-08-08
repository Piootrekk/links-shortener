import React, { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "@/supabase/auth";
import { User } from "@supabase/supabase-js";
import useFetchCallback from "@/hooks/useFetchCallback";

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthorized: boolean;
  execute: (...args: any[]) => Promise<void>;
}

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

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        isAuthorized: !!data,
        execute,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { useAuth };
export type { AuthContextType };
