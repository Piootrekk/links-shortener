import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import {
  processData24h,
  processDataWeek,
  processDataMonth,
  processDataYear,
  Tperiod,
} from "./lineChartConfig";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import { marginConfig } from "./lineChartConfig";
import { configColorsChart } from "./colorConfig";
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 border rounded">
        <p>{`Total: ${payload[0].value} clicks`}</p>
        {data.originalDate && (
          <p className="date">{`Date: ${data.originalDate}`}</p>
        )}
      </div>
    );
  }
  return null;
};

const ClickOverTimeChart = () => {
  const { analytics } = useAnalyticsData();
  const [period, setPeriod] = useState<Tperiod>("24h");
  if (!analytics || !analytics.data) return null;
  const details = analytics.data.hidden_details;
  const chartData = useMemo(() => {
    switch (period) {
      case "24h":
        return processData24h(details);
      case "1week":
        return processDataWeek(details);
      case "1month":
        return processDataMonth(details);
      case "1year":
        return processDataYear(details);
      default:
        return [];
    }
  }, [period]);

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: configColorsChart.colorChart1,
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Click Over Time Chart</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <label>
            Showing total visitors in period of time. Click custom period to
            view more details.
            {period === "24h" && " Showing data for the last 24 hours. "}
            {period === "1week" && " Showing data for the last week. "}
            {period === "1month" && " Showing data for the last month. "}
            {period === "1year" && " Showing data for the last year. "}
          </label>
          <div className="space-x-4 space-y-4">
            <Button
              variant={"outline"}
              onClick={() => setPeriod("24h")}
              className={`${period === "24h" && "bg-icon-blue text-primary"}`}
            >
              24h
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setPeriod("1week")}
              className={`${period === "1week" && "bg-icon-blue text-primary"}`}
            >
              1 week
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setPeriod("1month")}
              className={`${
                period === "1month" && "bg-icon-blue text-primary"
              }`}
            >
              1 month
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setPeriod("1year")}
              className={`${period === "1year" && "bg-icon-blue text-primary"}`}
            >
              1 year
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={marginConfig}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={
                    period === "24h"
                      ? "hour"
                      : period === "1week"
                      ? "day"
                      : period === "1month"
                      ? "day"
                      : "month"
                  }
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ChartLegend
                  content={<ChartLegendContent nameKey="clicks" />}
                />
                <Line
                  dataKey="count"
                  type="linear"
                  stroke="var(--color-clicks)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-clicks)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClickOverTimeChart;
