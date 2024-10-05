import { TUrls, TCrud } from "@/schemas/dbSchema";
import axiosInstance from "./axios";

const personalLinks = async () => {
  const response = await axiosInstance.get<TUrls>("/links");
  return response.data;
};

const insertPersonalLink = async (
  orginal_url: string,
  short_url: string,
  title: string
) => {
  const response = await axiosInstance.post<TCrud>("/link", {
    orginal_url,
    short_url,
    title,
  });
  return response.data;
};

const updatePersonalLink = async (
  id: string,
  orginal_url: string,
  title: string,
  short_url: string
) => {
  const response = await axiosInstance.put<TCrud>("/link", {
    id,
    orginal_url,
    title,
    short_url,
  });
  return response.data;
};

const deletePersonalLink = async (id: string, qr_code: string) => {
  const response = await axiosInstance.delete<TCrud>("/link", {
    data: { id, qr_code },
  });
  return response.data;
};

const downloadQrCode = async (qrPath: string) => {
  const response = await axiosInstance<Blob>({
    method: "POST",
    url: "/download-png",
    data: { qrPath },
    responseType: "blob",
  });
  return response.data;
};

export {
  personalLinks,
  insertPersonalLink,
  updatePersonalLink,
  deletePersonalLink,
  downloadQrCode,
};
export type { TCrud };
