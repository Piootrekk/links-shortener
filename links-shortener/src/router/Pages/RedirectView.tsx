import { redirectingToUrl } from "@/Api/endpoints";
import DirectMainPage from "@/components/Directing/DirectMainPage";
import DirectWithPassword from "@/components/Directing/DirectWithPassword";
import SkeletonUniversal from "@/components/Loading/SkeletonUniversal";
import useInstantFetch from "@/hooks/useInstantFetch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RedirectView = () => {
  const { custom_link } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!custom_link) {
      navigate("/404", { replace: true });
    }
  }, [custom_link, navigate]);

  const initRedirect = useInstantFetch(redirectingToUrl, [custom_link!]);

  useEffect(() => {
    if (initRedirect.error) {
      navigate("/404", { replace: true });
    }
  }, [initRedirect.error, navigate]);

  if (initRedirect.isLoading) {
    return <SkeletonUniversal />;
  }

  if (initRedirect.data?.password) {
    return <DirectWithPassword custom_link={custom_link!} />;
  }
  if (initRedirect.data?.password === false) {
    return <DirectMainPage custom_link={custom_link!} />;
  }
  return null;
};

export default RedirectView;
