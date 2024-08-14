import QRCode from "qrcode";

const promiseQR = async (text: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(
      text,
      { errorCorrectionLevel: "H", scale: 32, margin: 1 },
      (err, url) => {
        if (err) reject(err);
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => resolve(blob))
          .catch((err) => reject(err));
      }
    );
  });
};

const generateQR = async (text: string, fileName: string) => {
  try {
    const qrBlob = await promiseQR(text);
    const file = new File([qrBlob], `QR-${fileName}.png`, {
      type: "image/png",
    });
    return file;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default generateQR;
