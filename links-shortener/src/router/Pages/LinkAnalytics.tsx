import { getDetails } from "@/api/endpoints";
import MainAnalytics from "@/components/LinkAnalytics/MainAnalytics";
import { AnalyticsDataProvider } from "@/context/AnalyticsDataContext";

const LinkAnalytics = () => {
  return (
    <AnalyticsDataProvider fetchMethod={getDetails}>
      <MainAnalytics />
    </AnalyticsDataProvider>
  );
};

export default LinkAnalytics;
