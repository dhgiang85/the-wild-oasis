import {useMutation} from "@tanstack/react-query";
import {signUp as signUpApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


export default function useSignUp() {
  const navigate = useNavigate();
  const {mutate: signUp, isPending: isLoading} = useMutation({
    mutationFn: ({email, password, fullName}) => signUpApi(email, password, fullName),
    onSuccess: () => {
      toast.success('SignUp successfully!');
      navigate('/login',);
    },
    onError: (error) => toast.error(error.message),
  })
  return {signUp, isLoading};
}