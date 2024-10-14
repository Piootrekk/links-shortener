import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type AuthProtectedProps = {
  children: React.ReactNode;
};

const RequireNotAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate("/", { replace: true });
    }
  }, [user.data]);

  if (user.data === null) return children;
};

export default RequireNotAuth;
