import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { TransactionResponse } from "../../../utils/types";

const verifyTransaction = async ({
  verifyTransactionData,
  transactionID,
}: {
  verifyTransactionData: {
    code: string;
  };
  transactionID: number;
}): Promise<TransactionResponse> => {
  const { data } = await axiosInstance.post<TransactionResponse>(
    `/api/verify-transaction/${transactionID}`,
    verifyTransactionData
  );
  return data;
};

export default function useVerifyTransaction(transactionID: number) {

  return useMutation({
    mutationFn: (verifyTransactionData: { code: string }) =>
      verifyTransaction({ verifyTransactionData, transactionID }),
    onSuccess: (data) => {
      toast.success(data.message, { toastId: data.message });
    },
    onError: (data: AxiosError) => {
      if (data.response?.status == 500) {
        toast.error("Server Error: Please try again later", {
          toastId: data.message,
        });
      } else if (data.response?.status === 400) {
        toast.error("Invalid verification code", {
          toastId: data.message,
        });
      }
    },
  });
}
