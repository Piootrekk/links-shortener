import { TCrud, TRedirect, TStats, TUrl } from "@/schemas/dbSchema";
import axiosInstance from "./axios";
import { AxiosError } from "axios";

const setErrorIfNot200 = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response)
      throw new Error(
        error.response.data.message || "An unknown error occurred"
      );
    else if (error.request) throw new Error("No response from server");
    else throw new Error("An unknown error occurred");
  }
};

const getPersonalLinks = async () => {
  try {
    const response = await axiosInstance.get<TUrl[]>("/links");
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const getPersonalLinksWithStats = async () => {
  try {
    const response = await axiosInstance.get<TUrl[]>("/links-with-stats");
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const insertPersonalLink = async (
  orginal_url: string,
  short_url: string,
  title: string,
  password?: string
) => {
  try {
    const response = await axiosInstance.post<TCrud>("/link", {
      orginal_url,
      short_url,
      title,
      password,
    });
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const updatePersonalLink = async (
  id: string,
  orginal_url: string,
  title: string
) => {
  try {
    const response = await axiosInstance.put<TCrud>("/link", {
      id,
      orginal_url,
      title,
    });
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const deletePersonalLink = async (id: string, qr_code: string) => {
  try {
    const response = await axiosInstance.delete<TCrud>("/link", {
      data: {
        id,
        qr_code,
      },
    });
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const downloadQrCode = async (qrPath: string) => {
  try {
    const response = await axiosInstance.post<Blob>(
      "/download-png",
      { qrPath },
      { responseType: "blob" }
    );
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const getPersonalStatistics = async () => {
  try {
    const response = await axiosInstance.get<TStats>("/personal-statistics");
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const redirectingToUrl = async (shortUrl: string) => {
  try {
    const response = await axiosInstance.get<TRedirect>(
      `/redirect/${shortUrl}`
    );
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
};

const validateRedirect = async (short_url: string, password?: string) => {
  try {
    const response = await axiosInstance.post<{
      success: boolean;
      original_url: string;
    }>(`/validate-redirect`, {
      password,
      short_url,
    });
    return response.data;
  } catch (err: unknown) {
    setErrorIfNot200(err);
  }
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
};
export type { TCrud };
