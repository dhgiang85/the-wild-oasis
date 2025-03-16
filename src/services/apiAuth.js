import supabase from "./supabase.js";


export async function signInWithEmail(email, password) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const {data: {session}, error} = await supabase.auth.getSession();

  if (!session) return null;
  if (error) {
    throw new Error(error.message);
  }

  return session?.user;


}

export async function logoutUser() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}