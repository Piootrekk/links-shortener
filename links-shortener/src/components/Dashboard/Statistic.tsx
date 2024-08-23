import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TUrls } from "@/schemas/dbSchema";

type TContentInfo = {
  title: string;
  content: number | string;
};

type StatisticProps = {
  data: TUrls | undefined | null;
};

const Statistic: React.FC<StatisticProps> = ({ data }) => {
  const contentInfo: TContentInfo[] = [
    {
      title: "Your Links Created",
      content: data?.length || 0,
    },
    {
      title: "Your Links Clicked",
      content: 0,
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
