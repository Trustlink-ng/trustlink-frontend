import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/api";

interface ResetPasswordData {
  email: string;
}

const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await axiosInstance.post("/auth/reset-password", data);
      return response.data; // This returns the response data
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Something went wrong";

      // Show the error message in a toast
      toast.error(errorMessage, { toastId: error?.message });
    },
    onSuccess: () => {
      toast.success("Password reset email sent successfully", {
        toastId: "reset-email-sent",
      });
    },
  });
};

export default useResetPassword;
