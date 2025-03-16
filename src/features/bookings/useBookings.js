import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constants.js";


function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue};
  const sortByParam = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortByParam.split("-");
  const sortBy = {field, direction};
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const {
    data: {data: bookings, count} = {},
    isPending: isLoading,
    error,
  } =
    useQuery({
      queryKey: ["bookings", {filter, sortBy, page}],
      queryFn: () => getBookings({filter, sortBy, page}),
    });
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", {filter, sortBy, page: page + 1}],
      queryFn: () => getBookings({filter, sortBy, page: page + 1}),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", {filter, sortBy, page: page - 1}],
      queryFn: () => getBookings({filter, sortBy, page: page - 1}),
    });

  return {bookings, isLoading, error, count};
}

export default useBookings;