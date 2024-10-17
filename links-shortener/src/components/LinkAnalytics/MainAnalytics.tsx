import { TGetDetails } from "@/schemas/dbSchema";
import StatsBar from "./StatsBar";
import AnalyticsTable from "./AnalyticsTable";
import MapAnalytics from "./MapAnalytics";
import ChartAnalytics from "./Chart1Analytics";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Chart2Analytics from "./Chart2Analytics";

type MainAnalyticsProps = {
  data: TGetDetails;
};

const MainAnalytics: React.FC<MainAnalyticsProps> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      <StatsBar {...data} />
      <div className="shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Table Details</h2>
        {data.hidden_details.length > 0 ? (
          <AnalyticsTable
            details={data.hidden_details}
            onRowClick={setSelectedId}
          />
        ) : (
          <div className="text-muted-foreground">No data available</div>
        )}

        <Accordion type="single" collapsible className="w-full mt-6 ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Click to show map</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-center items-center">
                <div className=" rounded-lg p-6 w-3/4 items-center justify-center">
                  <h2 className="text-xl font-semibold">Locations</h2>
                  <p className="text-muted-foreground text-sm  mb-4">
                    You can click row from table to select it on map.
                  </p>
                  <MapAnalytics
                    data={data.hidden_details}
                    selectedId={selectedId}
                    onCloseMarker={() => setSelectedId(null)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Anayltics Chart</h2>
          <ChartAnalytics data={data} />
        </div>
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Anayltics Chart</h2>
          <Chart2Analytics data={data} />
        </div>
      </div>
    </div>
  );
};

export default MainAnalytics;
