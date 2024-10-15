import { getDetails } from "@/Api/endpoints";
import useInstantFetch from "@/hooks/useInstantFetch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LinkView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
    }
  }, [id, navigate]);

  const { data, isLoading, error } = useInstantFetch(getDetails, [id!]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <pre>{JSON.stringify(data?.hidden_details, null, 2)}</pre>;
};

export default LinkView;
