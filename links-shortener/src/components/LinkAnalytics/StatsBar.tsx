import {
  Earth,
  Globe,
  MonitorSmartphone,
  MousePointerClickIcon,
  Router,
  UserIcon,
} from "lucide-react";
import React from "react";
import StatCard, { StatCardProps } from "./StatCard";

type StatsBarProps = {
  totalClicks: number;
  uniqueClicks: number;
  uniqueCountries: number;
  uniqueISP: number;
  uniqueDevices: number;
  uniqueBrowsers: number;
};

const StatsBar: React.FC<StatsBarProps> = ({
  totalClicks,
  uniqueClicks,
  uniqueCountries,
  uniqueDevices,
  uniqueISP,
  uniqueBrowsers,
}) => {
  const stats: StatCardProps[] = [
    {
      icon: <MousePointerClickIcon />,
      title: "Total Clicks",
      value: totalClicks,
    },
    { icon: <UserIcon />, title: "Unique Users", value: uniqueClicks },
    {
      icon: <MonitorSmartphone />,
      title: "Unique Devices",
      value: uniqueDevices,
    },
    { icon: <Earth />, title: "Unique Countries", value: uniqueCountries },
    { icon: <Router />, title: "Unique ISP", value: uniqueISP },
    {
      icon: <Globe />,
      title: "Unique Browsers",
      value: uniqueBrowsers,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsBar;
