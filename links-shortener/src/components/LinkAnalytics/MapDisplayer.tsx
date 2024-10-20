import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import MapAnalytics from "./MapAnalytics";

type MapDisplayerProps = {
  selectedId: string | null;
  onCloseMarker: () => void;
};

const MapDisplayer: React.FC<MapDisplayerProps> = ({
  selectedId,
  onCloseMarker,
}) => {
  return (
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
                selectedId={selectedId}
                onCloseMarker={onCloseMarker}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MapDisplayer;
