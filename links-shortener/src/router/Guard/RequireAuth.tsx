import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthProtectedProps = PropsWithChildren;

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
