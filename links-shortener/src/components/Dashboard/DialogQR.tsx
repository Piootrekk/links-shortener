import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type DialogQRProps = {
  qrCode: string;
};

const DialogQR: React.FC<DialogQRProps> = ({ qrCode }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <img
            src={`${import.meta.env.VITE_DB_ENDPOINT || ""}/${qrCode}`}
            alt="QR Code"
            className="h-32 object-contain rounded-md ring ring-blue-500 self-start cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              Scan the QR code to open the link
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <img
              src={`${import.meta.env.VITE_DB_ENDPOINT || ""}/${qrCode}`}
              alt="QR Code"
              className="w-full h-auto object-contain rounded-md ring ring-blue-500"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogQR;
