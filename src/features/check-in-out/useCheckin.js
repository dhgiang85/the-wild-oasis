import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: checkin, isPending: isChecking} = useMutation({
    mutationFn: ({bookingId, breakfast}) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id}has been checked in`);
      queryClient.invalidateQueries({active: true})
      navigate("/")

    },
    onError: (error) => {
      toast.error(error.message);
    }
  })
  return {checkin, isChecking}
}