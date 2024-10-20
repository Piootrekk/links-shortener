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
import { useAnalyticsData } from "@/context/AnalyticsDataContext";

const StatsBar: React.FC<{}> = ({}) => {
  const { analytics } = useAnalyticsData();
  if (!analytics.data) return null;
  const stats: StatCardProps[] = [
    {
      icon: <MousePointerClickIcon />,
      title: "Total Clicks",
      value: analytics.data.totalClicks,
    },
    {
      icon: <UserIcon />,
      title: "Unique Users",
      value: analytics.data.uniqueClicks,
    },
    {
      icon: <MonitorSmartphone />,
      title: "Unique Devices",
      value: analytics.data.uniqueDevices,
    },
    {
      icon: <Earth />,
      title: "Unique Countries",
      value: analytics.data.uniqueCountries,
    },
    {
      icon: <Router />,
      title: "Unique ISP",
      value: analytics.data.uniqueISP,
    },
    {
      icon: <Globe />,
      title: "Unique Browsers",
      value: analytics.data.uniqueBrowsers,
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
