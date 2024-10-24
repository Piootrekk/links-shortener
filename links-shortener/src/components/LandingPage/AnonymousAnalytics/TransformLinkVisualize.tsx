import DialogAddRefreshShortUrl from "../../Dashboard/DialogAddRefreshShortUrl";
import { Card } from "../../ui/card";
import { ArrowDownIcon } from "lucide-react";

type TransformLinkProp = {
  link: string;
  shortUrl: string;
  setShortUrl: (shortUrl: string) => void;
};

const TransformLinkVisualize: React.FC<TransformLinkProp> = ({
  link,
  shortUrl,
  setShortUrl,
}) => {
  return (
    <div className="space-y-2 mt-4 flex flex-col ">
      <Card className="p-2 text-center w-full"> {link}</Card>
      <ArrowDownIcon size={36} className="self-center" />
      <div className="flex items-center justify-center gap-1">
        <Card className="p-2 text-center w-full flex-2">
          {import.meta.env.VITE_FRONTEND_URL || "URL"}/{"direct"}/{shortUrl}
        </Card>
        <DialogAddRefreshShortUrl
          setShortUrl={setShortUrl}
          clasName="flex-grow h-grow"
        />
      </div>
    </div>
  );
};

export default TransformLinkVisualize;
