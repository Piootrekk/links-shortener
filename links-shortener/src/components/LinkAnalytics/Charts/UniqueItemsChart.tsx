import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import { TTalbeHeaders } from "@/schemas/chartsTypes";
import { TDetails } from "@/schemas/dbSchema";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { configColorsChart } from "./colorConfig";
type UniqueItemsChartProps = {
  selectedColumn: TTalbeHeaders;
};

const UniqueItemsChart: React.FC<UniqueItemsChartProps> = ({
  selectedColumn,
}) => {
  const { analytics } = useAnalyticsData();
  if (!analytics?.data) return null;

  const details: TDetails[] = analytics.data.hidden_details;
  const selectedColumnData = details.map(
    (detail: TDetails) => detail[selectedColumn.key]
  );

  const chartData = Object.entries(
    selectedColumnData.reduce((acc: Record<string, number>, value) => {
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {})
  ).map(([key, count]) => ({
    name: key,
    count,
  }));

  const chartConfig = {
    desc: {
      label: selectedColumn.header,
      color: configColorsChart.colorChart3,
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Unique Items Chart</CardTitle>
        <CardDescription>
          Select a column to see the distribution. Current column:{" "}
          {selectedColumn.header}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="count"
                  fill={configColorsChart.colorChart3}
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniqueItemsChart;
