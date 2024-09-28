import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { VerifyEmailResponse, VerifyEmailCredentials } from "../../../utils/types";
import { setTokenWithExpiry } from "../../../utils/helpers";
import { toast } from "react-toastify";

const verifyEmail = async (
  verifyEmailData: VerifyEmailCredentials
): Promise<VerifyEmailResponse> => {
  const { data } = await axiosInstance.post<VerifyEmailResponse>(
    "/auth/verify-email",
    verifyEmailData
  );
  return data;
};

export default function useVerifyEmail() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      const responseData = data.data;

       setTokenWithExpiry(
         "access_token",
         responseData.access_token,
         24 * 60 * 60 * 1000
       );

      // Optionally, you can also store the user data if needed
      localStorage.setItem("user", JSON.stringify(responseData.user));
      toast.error(data.message, { toastId: data.message });
      navigate('/set-pin')

    },
    onError: (data) => {
      console.log(data);
      toast.error(data.message, { toastId: data.message });
    },
  });
}
