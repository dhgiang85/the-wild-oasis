import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../services/apiAuth.js";

export default function useUser() {
  const {data: user, isPending: isLoading, error} = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {user, isLoading, isAuthenticated: user?.role === "authenticated"};
}