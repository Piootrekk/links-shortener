import supabase from "../supabase";

const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("qrs")
    .upload(`/${file.name}`, file);
  if (error) throw new Error(error.message);
  return data.path;
};

const deleteFile = async (path: string) => {
  const { error } = await supabase.storage.from("qrs").remove([path]);
  if (error) throw new Error(error.message);
};

export { uploadFile, deleteFile };
