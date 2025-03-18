import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCurrentUser} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const {mutate: updateUser, isPending: isLoading} = useMutation({
    mutationFn: ({password, fullName, avatar}) => updateCurrentUser(password, fullName, avatar),
    onSuccess: (user) => {
      toast.success("Account updated successfully.");
      queryClient.setQueryData(["user"], user)
      // queryClient.invalidateQueries(["user"])
    },
    onError: (error) => toast.error(error.message),
  })
  return {updateUser, isLoading}
}