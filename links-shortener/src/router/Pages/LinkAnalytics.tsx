import { getDetails } from "@/Api/endpoints";
import MainAnalytics from "@/components/LinkAnalytics/MainAnalytics";
import useInstantFetch from "@/hooks/useInstantFetch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LinkAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useInstantFetch(getDetails, [id!]);
  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
    }
    if (error) {
      navigate("/404", { replace: true });
    }
  }, [id, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <MainAnalytics data={data} />;
  } else {
    return (
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  }
};

export default LinkAnalytics;
