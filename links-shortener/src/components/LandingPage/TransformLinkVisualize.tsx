import shortUrlGenerate from "@/lib/shortUrlGenerate";
import { Card } from "../ui/card";
import { useState } from "react";
import { ArrowDownIcon } from "lucide-react";

type TransformLinkProp = {
  link: string;
};

const TransformLinkVisualize: React.FC<TransformLinkProp> = ({ link }) => {
  const [shortUrl, _] = useState(shortUrlGenerate);
  return (
    <div className="space-y-2 mt-4 flex flex-col ">
      <Card className="p-2 text-center w-full">Orginal: {link}</Card>
      <ArrowDownIcon size={36} className="self-center" />
      <Card className="p-2 text-center w-full">
        Created: {import.meta.env.VITE_FRONTEND_URL || "URL"}/{"direct"}/
        {shortUrl}
      </Card>
    </div>
  );
};

export default TransformLinkVisualize;
