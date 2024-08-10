import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthProtectedProps = PropsWithChildren;

const RequireAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { isAuthorized, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized && isLoading === false) {
      navigate("/auth", { replace: true });
    }
    console.log("isAuthorized", isAuthorized);
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (isAuthorized && !isLoading) return children;
};

export default RequireAuth;
