import StatsBar from "./StatsBar";
import { Suspense, useState } from "react";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import { TTalbeHeaders } from "@/schemas/chartsTypes";
import { lazy } from "react";
import SkeletonUniversal from "../Loading/SkeletonUniversal";

const AnalyticsTable = lazy(() => import("./Table/AnalyticsTable"));
const ClickOverTimeChart = lazy(() => import("./Charts/ClickOverTimeChart"));
const MapDisplayer = lazy(() => import("./MapDisplayer"));
const UniqueItemsChart = lazy(() => import("./Charts/UniqueItemsChart"));

type DashboardAnalyticsProps = {};

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<TTalbeHeaders>({
    header: "Browser",
    key: "browser",
    allowToChart: true,
  });
  const onCloseMarker = () => setSelectedId(null);
  const { analytics } = useAnalyticsData();
  if (!analytics.data) return null;
  return (
    <div className="space-y-8">
      <Suspense fallback={<SkeletonUniversal />}>
        <StatsBar />
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Table Details</h2>
          {analytics.data.hidden_details.length > 0 ? (
            <AnalyticsTable
              onRowClick={setSelectedId}
              onColumnClick={setSelectedColumn}
            />
          ) : (
            <div className="text-muted-foreground">No data available</div>
          )}
          <MapDisplayer selectedId={selectedId} onCloseMarker={onCloseMarker} />
        </div>
        <ClickOverTimeChart />
        <UniqueItemsChart selectedColumn={selectedColumn} />
      </Suspense>
    </div>
  );
};

export default DashboardAnalytics;
