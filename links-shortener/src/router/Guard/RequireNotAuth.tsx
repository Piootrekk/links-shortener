import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
type AuthProtectedProps = PropsWithChildren;

const RequireNotAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { isAuthorized, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized && isLoading === false) {
      navigate("/", { replace: true });
    }
    console.log("isAuthorized", isAuthorized);
  }, [isAuthorized, navigate, isLoading]);
  if (isLoading) return <p>Loading...</p>;
  if (!isAuthorized && !isLoading) return children;
};

export default RequireNotAuth;
