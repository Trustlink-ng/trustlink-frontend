import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api"; // Adjust the path as needed
import { TransferRequest, TransactionResponse } from "../../../utils/types"; // Adjust the path as needed
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// Transfer function to call the API
const transferFunds = async (transferData: TransferRequest): Promise<TransactionResponse> => {
  const { data } = await axiosInstance.post<TransactionResponse>(
    `/api/wallet/pay`,
    transferData
  );
  return data;
};

// Custom hook for the transfer mutation
export default function useTransfer() {
  return useMutation({
    mutationFn: (transferData: TransferRequest) => transferFunds(transferData),
    onSuccess: (data: TransactionResponse) => {
      toast.success(data.message, { toastId: data.message });
      
    },
    onError: (error: AxiosError) => {
      console.error(error);
      if (error.response?.status === 500) {
        toast.error("Server Error: Please try again later", {
          toastId: "server-error",
        });
      } else if (error.response?.status === 404) {
        toast.error("Recipient does not exist", {
          toastId: "invalid-transfer",
        });
      } else if (error.response?.status === 401) {
        toast.error("Incorrect pin", {
          toastId: "invalid-transfer",
        });
      }
    },
  });
}
