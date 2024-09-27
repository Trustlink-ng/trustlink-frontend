import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
interface RequestRefundData {
  code: string;
}

interface RefundResponse {
  message: string;
  data: {
    transaction: number;
    reason: string;
    evidence: string;
  };
}

// Define the API call for requesting a refund
const confirmRefund = async ({
  requestRefundData,
  transactionID,
}: {
  requestRefundData: RequestRefundData;
  transactionID: number;
}): Promise<RefundResponse> => {

  const { data } = await axiosInstance.put<RefundResponse>(
    `/api/dispute-transaction/${transactionID}`,
    requestRefundData
  );
  return data;
};

export default function useConfirmRefund(transactionID: number) {
  return useMutation({
    mutationFn: (requestRefundData: RequestRefundData) =>
      confirmRefund({ requestRefundData, transactionID }),
    onSuccess: (data) => {
      toast.success(data.message, { toastId: data.message });
    },
    onError: (error: AxiosError) => {
        console.log(error);
      if (error.response?.status === 500) {
        toast.error("Server Error: Please try again later", {
          toastId: error.message,
        });
      } else if (error.response?.status === 400) {
        toast.error("Invalid refund request", {
          toastId: error.message,
        });
      }
    },
  });
}
