import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { TransactionResponse } from "../../../utils/types";

const getSingleTransaction = async (transactionID: number): Promise<TransactionResponse> => {
  const { data } = await axiosInstance.get<TransactionResponse>(
    `/api/verify-transaction/${transactionID}`
  );
  return data;
};

export default function useGetSingleTransactions(transactionID: number) {
  return useQuery({
    queryKey: ["transactions", transactionID],
    queryFn: () => getSingleTransaction(transactionID),
    enabled: true,
    staleTime: 0,
  });
}
