import {getBooking as getBookingApi} from "../../services/apiBookings.js";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";


export default function useBooking() {
  const {bookingId} = useParams();
  const {data: booking={}, isPending: isLoading, error} = useQuery({
    queryFn: () => getBookingApi(bookingId),
    queryKey: ["booking", bookingId],
    retry: false
  });

  return {booking, isLoading, error};
}