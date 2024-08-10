import supabase from "../supabase";

const getAllAuthUrls = async (user_id: string) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw new Error(error.message);
  return data;
};

const getAllUsers = async () => {
  const { data, error } = await supabase.from("urls").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const getAllNotAuthUrls = async () => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", null);
  if (error) throw new Error(error.message);
  return data;
};

export { getAllAuthUrls, getAllUsers, getAllNotAuthUrls };
