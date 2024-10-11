import { TStats } from "@/schemas/dbSchema";
import { Link2, MousePointerClick, TimerResetIcon } from "lucide-react";

type StatisticProps = {
  data: TStats;
};

const Statistic: React.FC<StatisticProps> = ({ data }) => {
  const contentInfo = [
    {
      title: "Total links",
      content: data.total_links,
      niceIcon: Link2,
    },
    {
      title: "Total clicks",
      content: data.total_clicks,
      niceIcon: MousePointerClick,
    },
    {
      title: "Last added",
      content: data.last_added
        ? new Date(data.last_added).toLocaleString()
        : "No links yet",
      niceIcon: TimerResetIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {contentInfo.map((info, index) => (
        <div
          className="rounded-lg p-4 flex items-center justify-between bg-secondary shadow-md"
          key={index}
        >
          <div className="flex items-center">
            <info.niceIcon className="w-8 h-8 " />
            <span className="ml-2 ">{info.title}</span>
          </div>
          <span className="text-xl font-semibold break-all">
            {info.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Statistic;
