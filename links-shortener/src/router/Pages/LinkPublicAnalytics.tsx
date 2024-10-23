import { getDetailsAnonymous } from "@/Api/endpoints";
import MainAnalytics from "@/components/LinkAnalytics/MainAnalytics";
import { AnalyticsDataProvider } from "@/context/AnalyticsDataContext";

const LinkPublicAnalytics = () => {
  return (
    <AnalyticsDataProvider fetchMethod={getDetailsAnonymous}>
      <MainAnalytics />
    </AnalyticsDataProvider>
  );
};

export default LinkPublicAnalytics;
