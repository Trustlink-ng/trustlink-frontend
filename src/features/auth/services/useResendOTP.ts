import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { ResendOTPCredentials, ResendOTPResponse } from "../../../utils/types";
import { toast } from "react-toastify";

const resendOTP = async (
  resendOTPData: ResendOTPCredentials
): Promise<ResendOTPResponse> => {
  const { data } = await axiosInstance.post<ResendOTPResponse>(
    "/auth/resend-otp",
    resendOTPData
  );
  return data;
};

export default function useResendOTP() {
  return useMutation({
    mutationFn: resendOTP,
    onSuccess: (data) => {
      toast.error(data.message, { toastId: data.message });
    },
    onError: (data) => {
      toast.error(data.message, { toastId: data.message });
    },
  });
}
