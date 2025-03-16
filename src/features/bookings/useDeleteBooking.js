import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {mutate: deleteBooking, isPending: isDeleting} = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success(`Booking successfully deleted!`);
      queryClient.invalidateQueries(["bookings"])
    },
    onError: (error) => {
      toast(error.message)
    }
  })
  return {deleteBooking, isDeleting}
}