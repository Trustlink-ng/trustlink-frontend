import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/api";

interface SaveBankAccountData {
  code: string;
  account_number: string;
}

const useSaveBankAccount = () => {
  return useMutation({
    mutationFn: async (saveBank: SaveBankAccountData) => {
      const { data } = await axiosInstance.post("/api/account", saveBank);
      return data;
    },
    onError: (error: AxiosError) => {
      toast.error("Error Saving bank account:", { toastId: error?.message });
    },
    onSuccess: () => {
      toast.success("Bank account saved successfully:", {
        toastId: "saved",
      });
    },
  });
};

export default useSaveBankAccount;
