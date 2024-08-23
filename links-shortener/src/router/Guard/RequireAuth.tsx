import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthProtectedProps = PropsWithChildren;

const RequireAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/auth", { replace: true });
    }
  }, []);

  if (isAuthorized) return children;
};

export default RequireAuth;
