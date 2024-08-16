import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "@/components/ui/loading-spin";

type AuthProtectedProps = PropsWithChildren;

const RequireNotAuth: React.FC<AuthProtectedProps> = ({ children }) => {
  const { isAuthorized, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized && isLoading === false) {
      navigate("/", { replace: true });
    }
  }, []);

  if (isLoading) return <LoadingSpin />;
  if (!isAuthorized && !isLoading) return children;
};

export default RequireNotAuth;
