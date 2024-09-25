import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { RequestPasswordResetCredentials, RequestPasswordResetResponse, } from "../../../utils/types";

const requestPasswordReset = async (
  requestPasswordResetData: RequestPasswordResetCredentials
): Promise<RequestPasswordResetResponse> => {
  const { data } = await axiosInstance.post<RequestPasswordResetResponse>(
    "/auth/resend-otp",
    requestPasswordResetData
  );
  return data;
};

export default function useRequestPasswordReset() {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      const responseData = data;
      console.log(responseData);
    },
    onError: (data) => {
      console.log(data);
    },
  });
}
