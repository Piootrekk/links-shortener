import { TUrl, TUrls } from "@/schemas/dbSchema";
import axiosInstance from "./axios";
import { TInsertLinkSchema } from "@/schemas/InsertLinkSchema";

type TCrud = {
  data: TUrl | null;
  success: boolean;
};

const userLinks = async () => {
  const response = await axiosInstance.get<TUrls>("/user-links");
  return response.data;
};

const insertLink = async (
  orginal_url: string,
  short_url: string,
  title: string,
  user_id: string
) => {
  const response = await axiosInstance.post<TCrud>("/add-link", {
    orginal_url,
    short_url,
    title,
    user_id,
  });
  return response.data;
};
const updateLink = async (data: TInsertLinkSchema) => {
  const response = await axiosInstance.put<TCrud>("/update-link", data);
  return response.data;
};

const deleteLink = async () => {};

export { userLinks, insertLink, updateLink, deleteLink };
export type { TCrud };
