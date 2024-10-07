import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TStats } from "@/schemas/dbSchema";
import { Link2, MousePointerClick, TimerResetIcon } from "lucide-react";

type TContentInfo = {
  title: string;
  content: number | string | Date;
  niceIcon?: React.ReactNode;
};

type StatisticProps = {
  data: TStats;
};

const Statistic: React.FC<StatisticProps> = ({ data }) => {
  const contentInfo: TContentInfo[] = [
    {
      title: "Total links",
      content: data.total_links,
      niceIcon: <Link2 size={24} />,
    },
    {
      title: "Total clicks",
      content: data.total_clicks,
      niceIcon: <MousePointerClick size={24} />,
    },
    {
      title: "Last added",
      content: data.last_added
        ? new Date(data.last_added).toLocaleString()
        : "No links yet",
      niceIcon: <TimerResetIcon size={24} />,
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-4 mt-12 w-full truncate text-ellipsis">
      {contentInfo.map((info, index) => (
        <Card key={index} className="flex-1 h-32">
          <CardHeader className="flex flex-col sm:flex-row items-center">
            <CardTitle className="hidden sm:block sm:pr-4">
              {info.title}
            </CardTitle>
            {info.niceIcon && (
              <div
                className={`flex ${
                  info.title ? "sm:justify-center" : "justify-center"
                }`}
              >
                {info.niceIcon}
              </div>
            )}
          </CardHeader>
          <CardContent className="sm:text-left text-center">
            <p>{info.content.toString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Statistic;
