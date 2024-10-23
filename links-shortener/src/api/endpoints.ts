import {
  TCrud,
  TGetDetails,
  TRedirect,
  TStats,
  TUrl,
} from "@/schemas/dbSchema";
import axiosInstance from "./axios";

const getPersonalLinks = async () => {
  const response = await axiosInstance.get<TUrl[]>("/links");
  return response.data;
};

const getPersonalLinksWithStats = async () => {
  const response = await axiosInstance.get<TUrl[]>("/links-with-stats");
  return response.data;
};

const insertPersonalLink = async (
  orginal_url: string,
  short_url: string,
  title: string,
  password?: string
) => {
  const response = await axiosInstance.post<TCrud>("/link", {
    orginal_url,
    short_url,
    title,
    password,
  });
  return response.data;
};

const updatePersonalLink = async (
  id: string,
  orginal_url: string,
  title: string
) => {
  const response = await axiosInstance.put<TCrud>("/link", {
    id,
    orginal_url,
    title,
  });
  return response.data;
};

const deletePersonalLink = async (id: string, qr_code: string) => {
  const response = await axiosInstance.delete<TCrud>("/link", {
    data: {
      id,
      qr_code,
    },
  });
  return response.data;
};

const downloadQrCode = async (qrPath: string) => {
  const response = await axiosInstance.post<Blob>(
    "/download-png",
    { qrPath },
    { responseType: "blob" }
  );
  return response.data;
};

const getPersonalStatistics = async () => {
  const response = await axiosInstance.get<TStats>("/personal-statistics");
  return response.data;
};

const redirectingToUrl = async (shortUrl: string) => {
  const response = await axiosInstance.get<TRedirect>(`/redirect/${shortUrl}`);
  return response.data;
};

const validateRedirect = async (short_url: string, password?: string) => {
  const response = await axiosInstance.post<{
    success: boolean;
    original_url: string;
  }>(`/validate-redirect`, {
    password,
    short_url,
  });
  return response.data;
};

const getDetails = async (id: string) => {
  const response = await axiosInstance.get<TGetDetails>(`/get-details/${id}`);
  return response.data;
};

const insertLinkAnonymous = async (orginalUrl: string, shortUrl: string) => {
  const response = await axiosInstance.post<TCrud>("/link-anon", {
    orginal_url: orginalUrl,
    short_url: shortUrl,
  });
  return response.data;
};

const getDetailsAnonymous = async (id: string) => {
  const response = await axiosInstance.get<TGetDetails>(
    `/get-details-anon/${id}`
  );
  return response.data;
};

export {
  getPersonalLinks,
  insertPersonalLink,
  updatePersonalLink,
  deletePersonalLink,
  downloadQrCode,
  getPersonalStatistics,
  getPersonalLinksWithStats,
  redirectingToUrl,
  validateRedirect,
  getDetails,
  insertLinkAnonymous,
  getDetailsAnonymous,
};
