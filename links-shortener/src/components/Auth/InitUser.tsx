import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const InitUser = () => {
  const { execute: fetchUser } = useAuth();
  useEffect(() => {
    fetchUser();
  }, []);

  return null;
};

export default InitUser;
