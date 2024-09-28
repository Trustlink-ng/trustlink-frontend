import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { GetWalletResponse } from "../../../utils/types";

const getWallet = async (): Promise<GetWalletResponse> => {
  const { data } = await axiosInstance.get<GetWalletResponse>("/api/wallet");
  return data;
};

export default function useGetWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
    enabled: true,
  });
}
