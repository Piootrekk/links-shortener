import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InitUser = () => {
  const { execute: fetchUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
    navigate("/");
  }, []);

  return null;
};

export default InitUser;
