import { redirectingToUrl } from "@/Api/endpoints";
import DirectMainPage from "@/components/Directing/DirectMainPage";
import DirectWithPassword from "@/components/Directing/DirectWithPassword";
import SkeletonUniversal from "@/components/Loading/SkeletonUniversal";
import useInstantFetch from "@/hooks/useInstantFetch";
import { useNavigate, useParams } from "react-router-dom";

const RedirectView = () => {
  const { custom_link } = useParams();
  const navigate = useNavigate();
  if (!custom_link) {
    navigate("/404", { replace: true });
    return null;
  }

  const initRedirect = useInstantFetch(redirectingToUrl, [custom_link]);

  if (initRedirect.isLoading) {
    return <SkeletonUniversal />;
  }

  if (initRedirect.error) {
    navigate("/404", { replace: true });
    return null;
  }

  if (initRedirect.data?.password) {
    console.log("Password protected");
    return <DirectWithPassword custom_link={custom_link} />;
  }
  if (initRedirect.data?.password === false) {
    console.log("Not password protected");
    return <DirectMainPage custom_link={custom_link} />;
  } else {
    navigate("/404", { replace: true });
    return null;
  }
};

export default RedirectView;
