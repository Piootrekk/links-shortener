import { createContext, PropsWithChildren, useContext } from "react";
import useFetchCallback from "@/hooks/useFetchCallback";
import { getPersonalLinks, getPersonalLinksWithStats } from "@/Api/endpoints";

type TRefreshData = {
  links: ReturnType<typeof useFetchCallback>;
  statistics: ReturnType<typeof useFetchCallback>;
};

const RefreshDataContext = createContext<TRefreshData | undefined>(undefined);

const useRefreshData = () => {
  const context = useContext(RefreshDataContext);
  if (context === undefined) {
    throw new Error("useRefreshData must be used within a RefreshDataProvider");
  }
  return context;
};

const RefreshDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const links = useFetchCallback(getPersonalLinks);
  const statistics = useFetchCallback(getPersonalLinksWithStats);

  return (
    <RefreshDataContext.Provider value={{ links, statistics }}>
      {children}
    </RefreshDataContext.Provider>
  );
};

export { RefreshDataProvider, useRefreshData };
