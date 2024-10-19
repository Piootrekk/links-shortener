import MainAnalytics from "@/components/LinkAnalytics/MainAnalytics";
import { AnalyticsDataProvider } from "@/context/AnalyticsDataContext";

const LinkAnalytics = () => {
  return (
    <AnalyticsDataProvider>
      <MainAnalytics />
    </AnalyticsDataProvider>
  );
};

export default LinkAnalytics;
