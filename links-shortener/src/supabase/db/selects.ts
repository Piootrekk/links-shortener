import supabase from "../supabase";

const queryTemplate = `created_at,
      id,
      original_url,
      qr_code,
      short_url,
      title,
      hidden_details (
        created_at,
        id,
        city,
        country,
        device,
        latitude,
        longitude
      )
`;

const getAllAuthroized = async (user_id: string) => {
  const { data, error } = await supabase
    .from("urls")
    .select(queryTemplate)
    .eq("user_id", user_id);
  if (error) throw new Error(error.message);
  return data;
};

const getAllUnauthroized = async () => {
  const { data, error } = await supabase
    .from("urls")
    .select(queryTemplate)
    .is("user_id", null);
  if (error) throw new Error(error.message);
  return data;
};

const getAll = async () => {
  const { data, error } = await supabase.from("urls").select(queryTemplate);
  if (error) throw new Error(error.message);
  return data;
};

export { getAllAuthroized, getAllUnauthroized, getAll };
