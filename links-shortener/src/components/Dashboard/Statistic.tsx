import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TUrls } from "@/schemas/dbSchema";

type TContentInfo = {
  title: string;
  content: number | string;
};

type StatisticProps = {
  data: TUrls | undefined | null;
  all: TUrls | undefined | null;
};

const Statistic: React.FC<StatisticProps> = ({ data, all }) => {
  const contentInfo: TContentInfo[] = [
    {
      title: "Your Links Created",
      content: data?.length || 0,
    },
    {
      title: "Total Links Created",
      content: all?.length || 0,
    },
    {
      title: "Your Links Clicked",
      content:
        data?.reduce((acc, curr) => acc + curr.hidden_details.length, 0) || 0,
    },
    {
      title: "Total Links Clicked",
      content:
        all?.reduce((acc, curr) => acc + curr.hidden_details.length, 0) || 0,
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-4 mt-12 w-full">
      {contentInfo.map((info, index) => (
        <Card key={index} className="flex-1">
          <CardHeader>
            <CardTitle>{info.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{info.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Statistic;
