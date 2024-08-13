import supabase from "../supabase";

const deleteSelectedUrl = async (id: string) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};

export { deleteSelectedUrl };
