import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/api";
import { useNavigate } from "react-router-dom";

interface CompleteResetData {
  token: string; // Token from the password reset link
  new_password: string; // New password
  confirm: string; // Confirm password
}

const useCompleteReset = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: CompleteResetData) => {
      const response = await axiosInstance.post(
        "/auth/complete-reset?token=" + data.token,
        data
      );
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
      toast.success("Password reset completed successfully", {
        toastId: "reset-completed",
      });
      localStorage.removeItem("access_token");
      navigate("/login");
    },
  });
};

export default useCompleteReset;
