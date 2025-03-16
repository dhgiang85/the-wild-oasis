import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


export default function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: checkout, isPending: isCheckingOut} = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out"
      }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id}has been checked out`);
      queryClient.invalidateQueries({active: true})
      navigate("/")

    },
    onError: (error) => {
      toast.error(error.message);
    }
  })
  return {checkout, isCheckingOut}
}