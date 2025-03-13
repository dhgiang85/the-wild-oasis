import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCarbins.js";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const {isPending: isEditing, mutate: editCabin} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      })
    },
    onError: error => toast.error(error.message),
  })
  return {isEditing, editCabin}
}