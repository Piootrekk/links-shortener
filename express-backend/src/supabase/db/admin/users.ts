import { adminSupabase } from "../../supabase";
const getAllUsers = async () => {
  const {
    data: { users },
    error,
  } = await adminSupabase.auth.admin.listUsers();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return users;
};

export { getAllUsers };
