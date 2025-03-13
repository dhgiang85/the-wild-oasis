import {useMutation} from "@tanstack/react-query";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const {isPending: isUpdating, mutate: updateSetting} = useMutation({
    mutationFn: updateSettingApi,
    onError: (err) => toast.error(err.message),
    onSuccess: ()=>{
      toast.success("App setting successfully updated.");
    }
  })
  return {isUpdating, updateSetting};
}