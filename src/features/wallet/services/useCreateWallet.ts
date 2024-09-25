import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { CreateWalletResponse } from "../../../utils/types";

const createWallet = async (createWalletData: {
  pin: string;
}): Promise<CreateWalletResponse> => {
  console.log(createWalletData);
  const { data } = await axiosInstance.post<CreateWalletResponse>(
    "/api/wallet",
    createWalletData
  );
  return data;
};

export default function useCreateWallet() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createWallet,
    onSuccess: (data) => {
      toast.success(data.message, { toastId: data.message });
      localStorage.setItem("isPinSet", "true");
      console.log(data);
      navigate("/");
    },
    onError: (data: AxiosError) => {
      console.log(data);
      toast.error("Server Error: Please try again later", {
        toastId: data.message,
      });
    },
  });
}
