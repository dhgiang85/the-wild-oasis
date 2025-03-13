import supabase, {REACT_APP_SUPABASE_URL} from "./supabase.js";

export async function getAllCabins() {
  const {data, error} = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function deleteCabin(cabinId) {

  const {error} = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId)
  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be deleted.");
  }

}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(REACT_APP_SUPABASE_URL);
  // 1. Create name for image
  const imageName = !hasImagePath && `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`;
  const imageUrl = hasImagePath ? newCabin.image : `${REACT_APP_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;
  // 2. Create New Cabin
  let query = await supabase.from('cabins')
  // New Cabin
  if (!id) query = query.insert([{...newCabin, image: imageUrl},]);
  // Update cabin
  if (id) query = query.update({...newCabin, image: imageUrl}).eq('id', id)
  console.log(newCabin);
  const {data, error} = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be created.");
  }
  if (!hasImagePath){
    // 3. Upload image up bucket
    const {error: storageImageError} = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);
    // 4. If upload image error. delete cabin
    if (storageImageError) {
      console.error(storageImageError.message);
      await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id)
      throw new Error("Image could not be uploaded.");
    }
  }

  return data;
}

// export async function createEditCabin(newCabin) {
//
//   // 1. Create name for image
//   const imageName = `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`;
//   const imageUrl = `${REACT_APP_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;
//   // 2. Create New Cabin
//   const {data, error} = await supabase
//     .from('cabins')
//     .insert([
//       {...newCabin, image: imageUrl},
//     ])
//     .select()
//   if (error) {
//     console.error(error.message);
//     throw new Error("Cabins could not be created.");
//   }
//   // 3. Upload image up bucket
//   const {error: storageImageError} = await supabase.storage
//     .from('cabin-images')
//     .upload(imageName, newCabin.image);
//   // 4. If upload image error. delete cabin
//   if (storageImageError) {
//     console.error(storageImageError.message);
//     await supabase
//       .from('cabins')
//       .delete()
//       .eq('id', data.id)
//     throw new Error("Image could not be uploaded.");
//   }
//   return data;
// }