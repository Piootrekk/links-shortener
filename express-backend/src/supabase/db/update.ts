import supabase from "../supabase";

const updateUrls = async (
  userId: string,
  id: string,
  formItems: {
    url: string;
    title: string;
    shortUrl: string;
  }
) => {
  const { data, error } = await supabase
    .from("urls")
    .update({
      original_url: formItems.url,
      title: formItems.title,
      short_url: formItems.shortUrl,
    })
    .eq("user_id", userId)
    .eq("id", id);
  if (error) throw new Error(error.message);
  return {
    data,
    success: true,
  };
};

export default updateUrls;
