import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface SaveBankAccountData {
  code: string;
  account_number: string;
}

const useSaveBankAccount = () => {
  return useMutation({
    mutationFn: async (data: SaveBankAccountData) => {
      const response = await axios.post("/api/account", data);
      return response.data; // This returns the response data
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
