import LinksProvider from "./LinksProvider";
import StatisticsProvider from "./StatisticsProvider";

const DashboardMain = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <StatisticsProvider />
      <LinksProvider />
    </div>
  );
};

export default DashboardMain;
