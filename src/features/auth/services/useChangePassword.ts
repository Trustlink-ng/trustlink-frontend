import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { ChangePasswordCredentials, ChangePasswordResponse } from "../../../utils/types";

const ChangePassword = async (
  resendOTPData: ChangePasswordCredentials
): Promise<ChangePasswordResponse> => {
  const { data } = await axiosInstance.post<ChangePasswordResponse>(
    "/auth/resend-otp",
    resendOTPData
  );
  return data;
};

export default function useChangePassword() {
  return useMutation({
    mutationFn : ChangePassword,
    onSuccess: (data) => {
      const responseData = data;
      console.log(responseData);
    },
    onError: (data) => {
      console.log(data);
    },
  });
}
