import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import OtpInput from "./OtpInput";
import { useFlow } from "./context/FlowContext";
import { Navigate } from "react-router-dom";
import {
  ResendOTPCredentials,
  VerifyEmailCredentials,
} from "../../utils/types";
import useVerifyEmail from "./services/useVerifyEmail";
import useResendOTP from "./services/useResendOTP";

export default function VerifyEmail() {
  const { isValidFlow } = useFlow();
  const { mutate: verify, isPending: loading } = useVerifyEmail();
  const { mutate: resend } = useResendOTP();

  // State for OTP and email
  const [credentials, setCredentials] = useState<VerifyEmailCredentials>({
    otp: "", // Initial empty OTP
    email: "", // Initial empty email, to be set from localStorage
  });

  // Fetch email from localStorage when component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setCredentials((prev) => ({
        ...prev,
        email: user?.email || "", // Assuming user data contains an email field
      }));
    }
  }, []);

  const handleResend = () => {
    const newData: ResendOTPCredentials = {
      email: credentials.email,
    };

    resend(newData);
  };

  // Handle OTP input change
  const handleOtpChange = (value: string) => {
    setCredentials((prev) => ({
      ...prev,
      otp: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verify(credentials);
  };

  if (!isValidFlow) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] lg:max-w-full flex lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full my-4">
          <h1 className="text-primary text-2xl text-left flex gap-2 font-semibold lg:text-2xl">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
        </div>
        <div className="w-full">
          <h1 className="lg:text-4xl text-left text-2xl font-medium">
            Verify Mail
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <p className="text-slate-500 text-left text-base">
              We have sent a code to{" "}
              <span className="font-semibold text-black">
                {credentials.email}
              </span>
            </p>
          </div>
          <div className="py-6 space-y-6 w-full">
            <div className="flex items-center justify-center">
              <OtpInput id={"verify-email"} length={6} onChange={handleOtpChange} />
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                className="bg-primary w-full max-w-xs outline-none data-[focus-visible=true]:outline-0 text-white"
                size="md"
                radius="full"
                name="submit"
                type="submit"
                isLoading={loading}
              >
                {loading ? "" : "Verify"}
              </Button>
            </div>
            <div className="flex justify-center">
              <p className="font-medium text-sm">
                Didn't receive the code?{" "}
                <span
                  onClick={handleResend}
                  className="font-medium text-primary cursor-pointer hover:opacity-80"
                >
                  Click to Resend
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
