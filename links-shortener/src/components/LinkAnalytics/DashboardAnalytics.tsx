import StatsBar from "./StatsBar";
import AnalyticsTable from "./AnalyticsTable";
import ChartAnalytics from "./Charts/PieChart";
import { useState } from "react";
import Chart2Analytics from "./Chart2Analytics";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import ClickOverTimeChart from "./Charts/ClickOverTimeChart";
import MapDisplayer from "./MapDisplayer";

type DashboardAnalyticsProps = {};

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
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
            selectedColumn={selectedColumn}
            
          />
        ) : (
          <div className="text-muted-foreground">No data available</div>
        )}
        <MapDisplayer selectedId={selectedId} onCloseMarker={onCloseMarker} />
      </div>
      <ClickOverTimeChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Anayltics Chart</h2>
          <ChartAnalytics data={analytics.data} />
        </div>
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Anayltics Chart</h2>
          <Chart2Analytics data={analytics.data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
