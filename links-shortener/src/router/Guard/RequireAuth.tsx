import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type AuthProtectedProps = {
  children: React.ReactNode;
};

const RequireAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data === null) {
      navigate("/auth", { replace: true });
    }
  }, []);

  if (user.data) return children;
};

export default RequireAuth;
