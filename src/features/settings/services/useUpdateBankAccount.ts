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
      toast.error("Error Updating bank account", { toastId: error?.message });
    },
    onSuccess: () => {
      toast.success("Bank account updated successfully", {
        toastId: "updated",
      });
    },
  });
};

export default useUpdateBankAccount;
