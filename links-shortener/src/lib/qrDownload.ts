import { downloadQrCode } from "@/Api/endpoints";

const qrDownload = async (qrCode: string, sessionId: string) => {
  const qrStream = await downloadQrCode(qrCode, sessionId);
  const qrUrl = URL.createObjectURL(
    new Blob([qrStream], { type: "image/png" })
  );
  const a = document.createElement("a");
  a.href = qrUrl;
  a.download = qrCode;
  a.click();
  URL.revokeObjectURL(qrUrl);
};

export default qrDownload;
