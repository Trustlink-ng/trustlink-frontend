import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { LoginCredentials, LoginResponse } from "../../../utils/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { setTokenWithExpiry } from "../../../utils/helpers";

const login = async (loginData: LoginCredentials): Promise<LoginResponse> => {
  // Remove any existing token before login
  delete axiosInstance.defaults.headers.common["Authorization"];
  console.log(loginData)
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    loginData
  );
  return data;
};

export default function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const responseData = data.data;
      toast.success(data.message, { toastId: data.message });

      const userData = responseData.user;

      // Store user data (or token if necessary)
      localStorage.setItem("user", JSON.stringify(userData));

      // Set token (if the response includes a token) for future requests
      setTokenWithExpiry(
        "access_token",
        responseData.access_token,
        24 * 60 * 60 * 1000
      );

      navigate("/");
      console.log(responseData);
    },
    onError: (data: AxiosError) => {
      console.log(data);
      if (data.response?.status == 500) {
        toast.error("Server Error: Please try again later", {
          toastId: data.message,
        });
      } else if (data.response?.status === 401) {
         toast.error("Invalid username or password", {
           toastId: data.message,
         });
      } 
    },
  });
}
