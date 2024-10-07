import { useRefreshData } from "@/context/RefreshDataContext";
import { useEffect } from "react";
import SkeletonFutures from "../Loading/SkeletonFutures";
import Statistic from "./Statistic";
import DashboardLinks from "./DashboardLinks";

const DashboardMain = () => {
  const { links, statistics } = useRefreshData();

  useEffect(() => {
    links.execute();
    statistics.execute();
  }, []);
  return (
    <div className="flex flex-col gap-8 pb-12">
      {statistics.isLoading ||
      statistics.error ||
      statistics.data === undefined ||
      statistics.data === null ? (
        <SkeletonFutures />
      ) : (
        <Statistic data={statistics.data} />
      )}
      {links.isLoading ||
      statistics.error ||
      statistics.data === undefined ||
      statistics.data === null ? (
        <SkeletonFutures />
      ) : (
        <DashboardLinks links={links.data} />
      )}
    </div>
  );
};

export default DashboardMain;
