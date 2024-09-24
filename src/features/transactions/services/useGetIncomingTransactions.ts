import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { AllTransactionsResponse } from "../../../utils/types";

const getIncomingTransactions = async (): Promise<AllTransactionsResponse> => {
  const { data } = await axiosInstance.get<AllTransactionsResponse>("/api/incoming/trans");
  return data;
};

export default function useGetIncomingTransactions() {
  return useQuery({
    queryKey: ["transactions", 'incoming'],
    queryFn: getIncomingTransactions,
    enabled: true,
    staleTime: 0,
  });
}
