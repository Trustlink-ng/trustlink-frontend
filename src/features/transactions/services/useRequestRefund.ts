import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
interface RequestRefundData {
  reason: string;
  proof: File;
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
const requestRefund = async ({
  requestRefundData,
  transactionID,
}: {
  requestRefundData: RequestRefundData;
  transactionID: number;
}): Promise<RefundResponse> => {
  const formData = new FormData();
  formData.append("reason", requestRefundData.reason);
  formData.append("proof", requestRefundData.proof);

  const { data } = await axiosInstance.post<RefundResponse>(
    `/api/dispute-transaction/${transactionID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

// Custom hook to handle the refund request
export default function useRequestRefund(transactionID: number) {
  return useMutation({
    mutationFn: (requestRefundData: RequestRefundData) =>
      requestRefund({ requestRefundData, transactionID }),
    onSuccess: (data) => {
      toast.success(data.message, { toastId: data.message });
    },
    onError: (error: AxiosError) => {
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
