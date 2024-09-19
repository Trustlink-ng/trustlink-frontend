import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { RegisterCredentials, RegisterResponse } from "../../../utils/types";
import { toast } from "react-toastify";
import { useFlow } from "../context/FlowContext";


const register = async (
  registerData: RegisterCredentials
): Promise<RegisterResponse> => {
  const { data } = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    registerData
  );
  return data;
};

export default function useRegister() {
  const navigate = useNavigate();
  const {setFlowValid }= useFlow();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const responseData = data.data;
      toast.success(data.message, {toastId: data.message})
      const userData = responseData.user;
      
      localStorage.setItem("user", JSON.stringify(userData));
      setFlowValid(true);
      navigate('/verify-email')
      console.log(responseData);
    },
    onError: (data) => {
      console.log(data)
      toast.error(data.message, { toastId: data.message });
    },
  });
}
