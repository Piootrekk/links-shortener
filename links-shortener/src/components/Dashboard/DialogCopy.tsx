import { Copy, CopyCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

type DialogCopyProps = {
  shortUrl: string;
};

const DialogCopy: React.FC<DialogCopyProps> = ({ shortUrl }) => {
  const URL = import.meta.env.VITE_FRONTEND_URL;
  if (!URL) throw new Error("VITE_FRONTEND_URL is not defined");

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${URL}/direct/${shortUrl}`);
    setCopied(true);
    toast.success("Copied to clipboard");
  };

  return (
    <Button
      variant={"ghost"}
      onClick={handleCopy}
      className="border border-transparent text-primary hover:border-primary focus:outline-none transition-colors duration-200"
    >
      {copied ? (
        <CopyCheck className="w-6 h-6" />
      ) : (
        <Copy className="w-6 h-6" />
      )}
    </Button>
  );
};

export default DialogCopy;
