import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{info.title}</CardTitle>
            <info.niceIcon className="h-4 w-4 text-muted-foreground " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{info.content}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Statistic;
