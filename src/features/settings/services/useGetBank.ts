import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api"; // Ensure this is the correct path to your axios instance

// Define the response type
interface BankResponse {
  message: string;
  data: {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    id: number;
    user: number;
  };
}

// Hook to fetch all banks
const getBank = async (): Promise<BankResponse> => {
  const { data } = await axiosInstance.get<BankResponse>("/api/my/account");
  return data;
};

export default function useGetBank() {
  return useQuery({
    queryKey: ["bank"],
    queryFn: getBank,
    enabled: true,
  });
}
