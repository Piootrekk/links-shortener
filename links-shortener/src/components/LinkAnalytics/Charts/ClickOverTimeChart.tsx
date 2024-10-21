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
  processDataAllTime,
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

import React from "react";

type ButtonToPeriodProps = {
  period: Tperiod;
  currentStatePeriod: Tperiod;
  setPeriod: (period: Tperiod) => void;
  label: string;
};

const ButtonToPeriod: React.FC<ButtonToPeriodProps> = ({
  period,
  currentStatePeriod,
  label,
  setPeriod,
}) => {
  return (
    <Button
      onClick={() => setPeriod(period)}
      className={`${
        period === currentStatePeriod && "bg-icon-blue text-primary"
      }`}
    >
      {label}
    </Button>
  );
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
      case "AllTime":
        return processDataAllTime(details);
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
            {period === "AllTime" && " Showing data for all time. "}
          </label>
          <div className="space-x-4 space-y-4">
            <ButtonToPeriod
              period="24h"
              currentStatePeriod={period}
              setPeriod={setPeriod}
              label="24h"
            />
            <ButtonToPeriod
              period="1week"
              currentStatePeriod={period}
              setPeriod={setPeriod}
              label="1 Week"
            />
            <ButtonToPeriod
              period="1month"
              currentStatePeriod={period}
              setPeriod={setPeriod}
              label="1 Month"
            />
            <ButtonToPeriod
              period="1year"
              currentStatePeriod={period}
              setPeriod={setPeriod}
              label="1 Year"
            />
            <ButtonToPeriod
              period="AllTime"
              currentStatePeriod={period}
              setPeriod={setPeriod}
              label="All Time"
            />
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
