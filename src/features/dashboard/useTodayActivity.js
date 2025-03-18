import {useQuery} from "@tanstack/react-query";
import {getStaysTodayActivity} from "../../services/apiBookings.js";


export default function useTodayActivity() {
  const {data: activities, isPending: isLoading} = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  })
  return {activities, isLoading};
}