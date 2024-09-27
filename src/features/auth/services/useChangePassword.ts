import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import {
  ChangePasswordCredentials,
  ChangePasswordResponse,
} from "../../../utils/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const ChangePassword = async (
  resendOTPData: ChangePasswordCredentials
): Promise<ChangePasswordResponse> => {
  const { data } = await axiosInstance.post<ChangePasswordResponse>(
    "/auth/change-password",
    resendOTPData
  );
  return data;
};

export default function useChangePassword() {
  return useMutation({
    mutationFn: ChangePassword,
    onSuccess: (data) => {
      const responseData = data;
      toast.success(responseData.message, { toastId: responseData?.message });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status == 500) {
        toast.error("Server Error: Please try again later", {
          toastId: error.message,
        });
      } else if (error.response?.status === 401) {
        toast.error("Old password", {
          toastId: error.message,
        });
      } else if (error.response?.status === 422) {
        toast.error("Old password same as new password", {
          toastId: error.message,
        });
      }
    },
  });
}
