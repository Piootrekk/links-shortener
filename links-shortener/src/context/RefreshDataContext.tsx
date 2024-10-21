import { createContext, useContext } from "react";
import useFetchCallback, { FetchState } from "@/hooks/useFetchCallback";
import { getPersonalLinks, getPersonalStatistics } from "@/Api/endpoints";
import { TStats, TUrl } from "@/schemas/dbSchema";

type TRefreshData = {
  links: FetchState<TUrl[], typeof getPersonalLinks>;
  statistics: FetchState<TStats, typeof getPersonalStatistics>;
  refreshBoth: () => Promise<void>;
};

type RefreshDataProviderProps = {
  children: React.ReactNode;
};

const RefreshDataContext = createContext<TRefreshData | undefined>(undefined);

const useRefreshData = () => {
  const context = useContext(RefreshDataContext);
  if (context === undefined) {
    throw new Error("useRefreshData must be used within a RefreshDataProvider");
  }
  return context;
};

const RefreshDataProvider: React.FC<RefreshDataProviderProps> = ({
  children,
}) => {
  const links = useFetchCallback(getPersonalLinks);
  const statistics = useFetchCallback(getPersonalStatistics);

  const refreshBoth = async () => {
    links.execute();
    statistics.execute();
  };
  return (
    <RefreshDataContext.Provider value={{ links, statistics, refreshBoth }}>
      {children}
    </RefreshDataContext.Provider>
  );
};

export { RefreshDataProvider, useRefreshData };
