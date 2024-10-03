import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpin from "@/components/ui/loading-spin";
import { Link2, MousePointerClick, TimerResetIcon } from "lucide-react";
type TContentInfo = {
  title: string;
  content: number | string | Date;
  niceIcon?: React.ReactNode;
};

type StatisticProps = {
  totalLinks?: number;
  totalClicks?: number;
  lastLink?: string | null;
  isLoading: boolean;
};

const Statistic: React.FC<StatisticProps> = ({
  totalLinks,
  totalClicks,
  lastLink,
  isLoading,
}) => {
  const contentInfo: TContentInfo[] = [
    {
      title: "Total links",
      content: totalLinks || 0,
      niceIcon: <Link2 size={24} />,
    },
    {
      title: "Total clicks",
      content: totalClicks || 0,
      niceIcon: <MousePointerClick size={24} />,
    },
    {
      title: "Last added",
      content: lastLink ? new Date(lastLink).toLocaleString() : "No links yet",
      niceIcon: <TimerResetIcon size={24} />,
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-4 mt-12 w-full truncate text-ellipsis">
      {contentInfo.map((info, index) => (
        <Card key={index} className="flex-1 h-32">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingSpin />
            </div>
          ) : (
            <>
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
            </>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Statistic;
