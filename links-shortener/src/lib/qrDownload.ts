import { downloadQrCode } from "@/Api/endpoints";

const qrDownload = async (qrCode: string) => {
  const qrStream = await downloadQrCode(qrCode);

  if (qrStream) {
    const qrUrl = URL.createObjectURL(
      new Blob([qrStream], { type: "image/png" })
    );
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = qrCode;
    a.click();
    URL.revokeObjectURL(qrUrl);

    // Kiedyś przerobić to na toast/
  } else {
    console.error("Cannot generate QR code.");
  }
};

export default qrDownload;
