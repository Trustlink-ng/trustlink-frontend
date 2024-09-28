import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api"; // Your axios instance

import { AccountDetailsResponse, GenerateAccountDetailsRequest } from "../../../utils/types";

const generateAccountDetails = async (amount: GenerateAccountDetailsRequest): Promise<AccountDetailsResponse> => {
  const { data } = await axiosInstance.post<AccountDetailsResponse>("/api/deposit/transfer", amount);
  return data;
};

export default function useGenerateAccountDetails(amount: number) {
    return useQuery({
      queryKey: ["accountDetails", amount], // Cache key that includes the amount
      queryFn: () => generateAccountDetails({amount}), // Fetch the account details
      enabled: false, 
    });
  }