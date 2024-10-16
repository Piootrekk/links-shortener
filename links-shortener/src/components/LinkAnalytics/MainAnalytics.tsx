import { TGetDetails } from "@/schemas/dbSchema";
import StatsBar from "./StatsBar";
import AnalyticsTable from "./AnalyticsTable";

type MainAnalyticsProps = {
  data: TGetDetails;
};

const MainAnalytics: React.FC<MainAnalyticsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <StatsBar {...data} />
      <div className="shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Table Details</h2>
        {data.hidden_details.length > 0 ? (
          <AnalyticsTable details={data.hidden_details} />
        ) : (
          <div className="text-muted-foreground">No data available</div>
        )}
      </div>
    </div>
  );
};

export default MainAnalytics;
