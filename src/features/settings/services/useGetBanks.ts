import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { Bank } from "../../../utils/types";

// Define the paginated response type
interface BanksResponse {
  message: string;
  banks: Bank[];
}

// Fetch paginated banks
const getBanks = async (): Promise<BanksResponse> => {
  const { data } = await axiosInstance.get<BanksResponse>("/api/account");
  return data;
};

// Hook to fetch banks with dynamic page loading
export default function useGetBanks() {
  return useQuery({
    queryKey: ["banks"], // Query key includes the current URL (page)
    queryFn: () => getBanks(), // Fetch data from the provided URL
    staleTime: 0,
  });
}
