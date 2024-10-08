import { useRefreshData } from "@/context/RefreshDataContext";
import { useEffect } from "react";
import DashboardLinks from "./DashboardLinks";
import SkeletonLinksAndFilter from "../Loading/SkeletonLinksAndFilter";

const LinksProvider = () => {
  const { links } = useRefreshData();

  useEffect(() => {
    links.execute();
  }, []);

  if (
    links.isLoading ||
    links.error ||
    links.data === null ||
    links.data === undefined
  ) {
    return <SkeletonLinksAndFilter />;
  }

  return <DashboardLinks links={links.data} />;
};

export default LinksProvider;
