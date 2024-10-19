import { getDetails } from "@/Api/endpoints";
import useFetchCallback from "@/hooks/useFetchCallback";
import { createContext, useContext } from "react";

type TAnalyticsData = {
  analytics: ReturnType<typeof useFetchCallback>;
};

type AnalyticsDataProps = {
  children: React.ReactNode;
};

const AnalyticsDataContext = createContext<TAnalyticsData | undefined>(
  undefined
);

const useAnalyticsData = () => {
  const context = useContext(AnalyticsDataContext);
  if (context === undefined) {
    throw new Error(
      "useAnalyticsData must be used within a AnalyticsDataProvider"
    );
  }
  return context;
};

const AnalyticsDataProvider: React.FC<AnalyticsDataProps> = ({ children }) => {
  const analytics = useFetchCallback(getDetails);
  return (
    <AnalyticsDataContext.Provider
      value={{
        analytics,
      }}
    >
      {children}
    </AnalyticsDataContext.Provider>
  );
};

export { AnalyticsDataProvider, useAnalyticsData };
