import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/api";

const useUpdateTransactionPin = () => {
  return useMutation({
    mutationFn: async (data: {
      old_pin: string;
      new_pin: string;
      confirm: string;
    }) => {
      const response = await axiosInstance.put("/api/wallet", data);
      return response.data; // This returns the response data
    },
    onError: (error: AxiosError) => {
      toast.error("Error Updating bank account:", { toastId: error?.message });
    },
    onSuccess: () => {
      toast.success("Pin successfully updated", {
        toastId: "updated",
      });
    },
  });
};

export default useUpdateTransactionPin;
