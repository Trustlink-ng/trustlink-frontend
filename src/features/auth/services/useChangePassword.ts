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
      const statusCode = error.response?.status;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Something went wrong";

      if (statusCode === 500) {
        toast.error("Server Error: Please try again later", {
          toastId: error.message,
        });
      } else if (statusCode === 401) {
        toast.error(errorMessage, {
          toastId: error.message,
        });
      } else if (statusCode === 422) {
        toast.error(errorMessage, {
          toastId: error.message,
        });
      } else {
        toast.error(errorMessage, {
          toastId: error.message,
        });
      }
    },
  });
}
