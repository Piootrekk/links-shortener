import supabase from "./supabase";
import Role from "../schemas/enums/role";
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role: Role.redneck } },
  });
  if (error) throw error.message;
  return data;
};

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error.message;
  return data;
};

const tockenVerify = async (token: string) => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw error.message;
  if (data === null || data.user === null) throw "User not found";
  return data.user;
};

export { signUp, signIn, tockenVerify };
