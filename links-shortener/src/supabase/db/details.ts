import supabase from "../supabase";

export const getAllDetails = async (urls_ids: string[]) => {
  const { data, error } = await supabase
    .from("hidden_details")
    .select("*")
    .in("url_id", urls_ids);
  if (error) throw new Error(error.message);
  return data;
};
