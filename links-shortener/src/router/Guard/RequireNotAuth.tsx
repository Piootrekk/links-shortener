import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type AuthProtectedProps = PropsWithChildren;

const RequireNotAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/", { replace: true });
    }
  }, []);

  if (!isAuthorized) return children;
};

export default RequireNotAuth;
