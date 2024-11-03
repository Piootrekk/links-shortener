import { useRefreshData } from "@/context/RefreshDataContext";
import { useEffect } from "react";
import DashboardLinks from "./DashboardLinks";
import SkeletonLinksAndFilter from "../Loading/SkeletonLinksAndFilter";
import Error from "@/router/Pages/Error";

const LinksProvider = () => {
  const { links } = useRefreshData();

  useEffect(() => {
    links.execute();
  }, []);

  if (links.isLoading) {
    return <SkeletonLinksAndFilter />;
  }
  if (links.error || links.data === null || links.data === undefined) {
    return <Error alertText="Failed to load links" />;
  }
  return <DashboardLinks links={links.data} />;
};

export default LinksProvider;
