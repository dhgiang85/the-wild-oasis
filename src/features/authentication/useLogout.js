import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logoutUser} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";

function UseLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {isPending: isLoading, mutate: logout} = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate("/login", {replace: true})
    },
  })
  return {logout, isLoading};
}

export default UseLogout;