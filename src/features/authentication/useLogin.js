import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signInWithEmail} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: login, isPending: isLogin} = useMutation({
    mutationFn: ({email, password}) => signInWithEmail(email, password),
    onSuccess: (data) => {
      toast.success("Login successful");
      queryClient.setQueriesData(['user'], data?.user)
      navigate("/dashboard", {replace: true});
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })
  return {login, isLogin}

}