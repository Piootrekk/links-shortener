import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const UserAuthChecker = () => {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return null;
};

export default UserAuthChecker;
