import supabase, {REACT_APP_SUPABASE_URL} from "./supabase.js";


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

export async function signUp(email, password, fullName) {
  const {data, error} = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        avatar: ""
      }
    }
  })
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUser(password, fullName, avatar) {
  let updateData;

  if (password) updateData = {password};
  if (fullName) updateData = {data: {fullName}};
  const {data, error} = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`
  const {error: storageError} = await supabase.storage.from("avatars").upload(fileName, avatar)

  if (storageError) throw new Error(storageError.message);

  const {data:updatedUser, error2} = await supabase.auth.updateUser({
    data:{
      avatar: `${REACT_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
    }
  })

  if (error2) throw new Error(error2.message);

  return updatedUser
}