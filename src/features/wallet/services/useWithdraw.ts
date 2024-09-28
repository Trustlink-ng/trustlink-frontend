import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api"; // Adjust the path as needed
import { WithdrawRequest } from "../../../utils/types"; // Adjust the path as needed
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// Transfer function to call the API
const withdrawFunds = async (withdrawData: WithdrawRequest) => {
  const { data } = await axiosInstance.post(`/api/withdraw`, withdrawData);
  return data;
};

// Custom hook for the transfer mutation
export default function useWithdraw() {
  return useMutation({
    mutationFn: (withdrawData: WithdrawRequest) => withdrawFunds(withdrawData),
    onSuccess: (data) => {
      toast.success(data.message, { toastId: data.message });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      if (error.response?.status === 500) {
        toast.error("Server Error: Please try again later", {
          toastId: "server-error",
        });
      } else if (error.response?.status === 401) {
        toast.error("Incorrect pin", {
          toastId: "invalid-transfer",
        });
      } else {
        toast.error("You have not added a withdrawal bank. Go to Settings", {
          toastId: "invalid-transfer",
        });
      }
    },
  });
}
