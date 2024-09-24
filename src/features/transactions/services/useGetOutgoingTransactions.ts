import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { AllTransactionsResponse } from "../../../utils/types";

const getOutgoingTransactions = async (): Promise<AllTransactionsResponse> => {
  const { data } = await axiosInstance.get<AllTransactionsResponse>("/api/outgoing/trans");
  return data;
};

export default function useGetOutgoingTransactions() {
  return useQuery({
    queryKey: ["transactions", 'outgoing'],
    queryFn: getOutgoingTransactions,
    enabled: true,
    staleTime: 0,
  });
}
