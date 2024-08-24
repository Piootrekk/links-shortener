import { TExtendedUrl, TUrl, TUrls } from "@/schemas/dbSchema";
import axiosInstance from "./axios";

type TCrud = {
  data: TUrl | null;
  success: boolean;
};

const getheader = (sessionId: string) => {
  return { Authorization: `Bearer ${sessionId}` };
};

const userLinks = async (sessionId: string) => {
  const response = await axiosInstance<TUrls>({
    method: "GET",
    url: "/user-links-old",
    headers: getheader(sessionId),
  });
  return response.data;
};

const insertLink = async (
  sessionId: string,
  orginal_url: string,
  short_url: string,
  title: string
) => {
  const response = await axiosInstance<TCrud>({
    method: "POST",
    url: "/add-link",
    headers: getheader(sessionId),
    data: { orginal_url, short_url, title },
  });
  return response.data;
};

const updateLink = async (
  sessionId: string,
  id: string,
  orginal_url: string,
  title: string,
  short_url: string
) => {
  const response = await axiosInstance<TCrud>({
    method: "PUT",
    url: "/update-link",
    headers: getheader(sessionId),
    data: { id, orginal_url, title, short_url },
  });
  return response.data;
};

const deleteLink = async (sessionId: string, id: string, qr_code: string) => {
  const response = await axiosInstance<TCrud>({
    method: "DELETE",
    url: "/delete-link",
    headers: getheader(sessionId),
    data: { id, qr_code },
  });
  return response.data;
};

const userLinksWithInfo = async (sessionId: string) => {
  const response = await axiosInstance<TExtendedUrl>({
    method: "GET",
    url: "/user-links",
    headers: getheader(sessionId),
  });
  return response.data;
};

const downloadQrCode = async (qrPath: string, sessionId: string) => {
  const response = await axiosInstance<Blob>({
    method: "POST",
    url: "/download-png",
    data: { qrPath },
    headers: getheader(sessionId),
    responseType: "blob",
  });
  return response.data;
};

export {
  userLinks,
  insertLink,
  updateLink,
  deleteLink,
  userLinksWithInfo,
  downloadQrCode,
};
export type { TCrud };
