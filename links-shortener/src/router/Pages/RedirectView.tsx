import { redirectingToUrl } from "@/Api/endpoints";
import ErrorMessage from "@/components/Error/ErrorMessage";
import LoadingSpin from "@/components/ui/loading-spin";
import useInstantFetch from "@/hooks/useInstantFetch";
import { useNavigate, useParams } from "react-router-dom";

const RedirectView = () => {
  const { custom_link } = useParams();
  const navigate = useNavigate();
  if (!custom_link) {
    navigate("/404", { replace: true });
    return null;
  }
  const { data, error, isLoading } = useInstantFetch(redirectingToUrl, [
    custom_link,
  ]);

  return (
    <section className="flex justify-center my-48 h-full">
      {isLoading && (
        <div className="text-4xl gap-y-2">
          <p>Redirecting...</p>
          <LoadingSpin />
        </div>
      )}
      {error && <ErrorMessage message={error.message} className="text-4xl" />}
      {data && <p>{data.success}</p>}
    </section>
  );
};

export default RedirectView;
