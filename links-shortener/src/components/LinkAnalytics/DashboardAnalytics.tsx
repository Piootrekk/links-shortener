import StatsBar from "./StatsBar";
import AnalyticsTable from "./AnalyticsTable";
import { useState } from "react";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import ClickOverTimeChart from "./Charts/ClickOverTimeChart";
import MapDisplayer from "./MapDisplayer";
import { TTalbeHeaders } from "@/schemas/chartsTypes";
import UniqueItemsChart from "./Charts/UniqueItemsChart";
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
    </div>
  );
};

export default DashboardAnalytics;
