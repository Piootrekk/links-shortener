import supabase from "./supabase";
import Role from "../schemas/enums/role";
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role: Role.redneck } },
  });
  if (error) throw new Error(error.message);
  return data;
};

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session?.user ?? null;
};

const tockenVerify = async (token: string) => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw new Error(error.message);
  return data;
};

export { signUp, signIn, signOut, getCurrentUser, tockenVerify };
