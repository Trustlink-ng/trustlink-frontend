import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/api";

interface UpdateBankAccountData {
  code: string;
  account_number: string;
}

const useUpdateBankAccount = () => {
  return useMutation({
    mutationFn: async (data: UpdateBankAccountData) => {
      const response = await axiosInstance.put("/api/account", data);
      return response.data; // This returns the response data
    },
    onError: (error: AxiosError) => {
      // const status = error.response?.status;
      // let errorMessage;

      // Check for specific status codes and set the appropriate message
      // if (status === 400) {
      //   errorMessage = "Account not found"; // Custom message for 400 errors
      // } else {
      //   errorMessage = (error.response?.data as { message?: string })?.message || "Something went wrong"; // Default message
      // }

      // Show the error message in a toast
      toast.error("Account not found", { toastId: error?.message });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Bank account updated successfully", {
        toastId: "updated",
      });
    },
  });
};

export default useUpdateBankAccount;
