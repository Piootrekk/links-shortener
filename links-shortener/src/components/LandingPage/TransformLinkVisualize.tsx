import shortUrlGenerate from "@/lib/shortUrlGenerate";
import { Card } from "../ui/card";
import { useState } from "react";

type TransformLinkProp = {
  link: string;
};

const TransformLinkVisualize: React.FC<TransformLinkProp> = ({ link }) => {
  const [shortUrl, _] = useState(shortUrlGenerate);
  return (
    <div>
      <Card className="p-2 text-center w-2/3">{link}</Card>
      <Card className="p-2 text-center w-2/3">
        {import.meta.env.VITE_FRONTEND_URL || "URL"}/{shortUrl}
      </Card>
    </div>
  );
};

export default TransformLinkVisualize;
