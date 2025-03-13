import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCarbins.js";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const {isPending: isCreating,mutate: createCabin} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      })
    },
    onError: error => toast.error(error.message),
  })
  return {isCreating,createCabin}
}