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
            className="h-fit w-fit object-contain rounded-md ring ring-blue-500 cursor-pointer justify-center"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              Scan the QR code to open the link
            </DialogDescription>
          </DialogHeader>

          <img
            src={`${import.meta.env.VITE_DB_ENDPOINT || ""}/${qrCode}`}
            alt="QR Code"
            className="w-fit h-fit object-contain rounded-md ring ring-blue-500"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogQR;
