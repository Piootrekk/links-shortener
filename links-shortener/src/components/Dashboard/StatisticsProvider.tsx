import { useRefreshData } from "@/context/RefreshDataContext";
import { useEffect } from "react";
import SkeletonStats from "../Loading/SkeletonStats";
import Statistic from "./Statistic";

const StatisticsProvider: React.FC<{}> = ({}) => {
  const { statistics } = useRefreshData();

  useEffect(() => {
    statistics.execute();
  }, []);

  if (
    statistics.isLoading ||
    statistics.error ||
    statistics.data === null ||
    statistics.data === undefined
  ) {
    return <SkeletonStats />;
  }
  return (
    <>
      <Statistic data={statistics.data} />
    </>
  );
};

export default StatisticsProvider;
