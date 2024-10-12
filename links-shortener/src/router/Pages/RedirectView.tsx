import DirectMainPage from "@/components/Directing/DirectMainPage";
import { useNavigate, useParams } from "react-router-dom";

const RedirectView = () => {
  const { custom_link } = useParams();
  const navigate = useNavigate();
  if (!custom_link) {
    navigate("/404", { replace: true });
    return null;
  }
  return <DirectMainPage custom_link={custom_link} />;
};

export default RedirectView;
