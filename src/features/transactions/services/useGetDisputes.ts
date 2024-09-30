import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { DisputeResponse } from "../../../utils/types";

const getDisputes = async (): Promise<DisputeResponse> => {
  const { data } = await axiosInstance.get<DisputeResponse>(
    "/api/all/disputes"
  );
  return data;
};

export default function useGetDisputes() {
  return useQuery({
    queryKey: ["disputes"],
    queryFn: getDisputes,
    enabled: true,
  });
}
