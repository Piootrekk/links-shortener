import { TUrl, TUrls } from "@/schemas/dbSchema";
import axiosInstance from "./axios";

type TCrud = {
  data: TUrl | null;
  success: boolean;
};

const header = {
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

const userLinks = async () => {
  const response = await axiosInstance<TUrls>({
    method: "GET",
    url: "/user-links",
    headers: header,
  });
  return response.data;
};

const insertLink = async (
  orginal_url: string,
  short_url: string,
  title: string
) => {
  const response = await axiosInstance<TCrud>({
    method: "POST",
    url: "/insert-link",
    headers: header,
    data: { orginal_url, short_url, title },
  });
  return response.data;
};

const updateLink = async (
  id: string,
  orginal_url: string,
  title: string,
  short_url: string
) => {
  const response = await axiosInstance<TCrud>({
    method: "PUT",
    url: "/update-link",
    headers: header,
    data: { id, orginal_url, title, short_url },
  });
  return response.data;
};

const deleteLink = async (id: string, qr_code: string) => {
  const response = await axiosInstance<TCrud>({
    method: "DELETE",
    url: "/delete-link",
    headers: header,
    data: { id, qr_code },
  });
  return response.data;
};

export { userLinks, insertLink, updateLink, deleteLink };
export type { TCrud };
