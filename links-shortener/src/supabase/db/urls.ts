import supabase from "../supabase";

export const getAllUrls = async (user_id: string) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw new Error(error.message);
  return data;
};
