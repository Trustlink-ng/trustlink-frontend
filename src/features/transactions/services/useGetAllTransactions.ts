import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { AllTransactionsResponse } from "../../../utils/types";

const getAllTransactions = async (): Promise<AllTransactionsResponse> => {
  const { data } = await axiosInstance.get<AllTransactionsResponse>("/api/trans/history");
  return data;
};

export default function useGetAllTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    enabled: true,
  });
}
