import { Download } from "lucide-react";
import { Button } from "../ui/button";
import qrDownload from "@/lib/qrDownload";

type DialogDownloadProps = {
  qrCode: string;
};
const DialogDownload: React.FC<DialogDownloadProps> = ({ qrCode }) => {
  const handleDownload = () => {
    qrDownload(qrCode);
  };

  return (
    <Button variant={"ghost"} onClick={handleDownload} disabled={!qrCode}>
      <Download className="w-6 h-6" />
    </Button>
  );
};

export default DialogDownload;
