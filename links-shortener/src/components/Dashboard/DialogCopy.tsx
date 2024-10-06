import { Copy, CopyCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

type DialogCopyProps = {
  shortUrl: string;
};

const DialogCopy: React.FC<DialogCopyProps> = ({ shortUrl }) => {
  const URL = import.meta.env.VITE_FRONTEND_URL;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${URL}/${shortUrl}`);
    setCopied(true);
  };

  return (
    <Button variant={"ghost"} onClick={handleCopy}>
      {copied ? (
        <CopyCheck className="w-6 h-6" />
      ) : (
        <Copy className="w-6 h-6" />
      )}
    </Button>
  );
};

export default DialogCopy;
