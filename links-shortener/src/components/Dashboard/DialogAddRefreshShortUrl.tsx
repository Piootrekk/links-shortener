import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import shortUrlGenerate from "@/lib/shortUrlGenerate";
import { cn } from "@/lib/utils";

type DialogAddRefreshShortUrlProps = {
  setShortUrl: (shortUrl: string) => void;
  clasName?: string;
};

const DialogAddRefreshShortUrl: React.FC<DialogAddRefreshShortUrlProps> = ({
  setShortUrl,
  clasName,
}) => {
  const onHandleShortUrlGenerate = () => {
    setShortUrl(shortUrlGenerate(2, 6));
  };
  return (
    <Button
      className={cn(clasName, "")}
      variant="outline"
      type="button"
      onClick={() => onHandleShortUrlGenerate()}
    >
      <RefreshCcw />
    </Button>
  );
};

export default DialogAddRefreshShortUrl;
