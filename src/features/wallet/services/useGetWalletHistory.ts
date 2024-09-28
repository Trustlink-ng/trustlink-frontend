import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import {WalletHistoryResponse } from "../../../utils/types";

const getWalletHistory = async (): Promise<WalletHistoryResponse> => {
  const { data } = await axiosInstance.get<WalletHistoryResponse>("/api/wallet/history");
  return data;
};

export default function useGetWalletHistory() {
  return useQuery({
    queryKey: ["wallet-history"],
    queryFn: getWalletHistory,
    enabled: true,
  });
}
