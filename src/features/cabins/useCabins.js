import {useQuery} from "@tanstack/react-query";
import {getAllCabins} from "../../services/apiCarbins.js";

export default function useCabins() {
  const {
    isPending: isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins
  })
  return {isLoading, error, cabins};
}