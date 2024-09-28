import { Navigate } from "react-router-dom";
import { useFlow } from "../auth/context/FlowContext";
import OtpInput from "../auth/OtpInput";
import { useState } from "react";
import useCreateWallet from "./services/useCreateWallet";
import { Button } from "@nextui-org/react";

export default function SetTransactionPin() {
    const { isValidFlow } = useFlow();


    const [pin, setPin] = useState("")

    const {mutate: createWallet, isPending: loading} = useCreateWallet();
    
      // Fetch email from localStorage when component mounts
    
    
      // Handle OTP input change
      const handleOtpChange = (value: string) => setPin(value);

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createWallet({"pin": pin});
      };

  if (!isValidFlow) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full flex items-center justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
          <h1 className="text-primary text-2xl my-4 flex gap-2 font-semibold lg:text-2xl">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
          <h1 className="lg:text-4xl text-2xl font-medium">
            Set Transaction PIN
          </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <p className="text-slate-500 text-base">
            Set your transaction PIN
            </p>
          </div>
          <div className="py-6 space-y-6 w-full">
            <div className="flex items-center justify-center">
              <OtpInput id={"set-pin"} length={4} onChange={handleOtpChange} />
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                className="bg-primary w-full max-w-xs outline-none data-[focus-visible=true]:outline-0 text-white"
                size="lg"
                radius="full"
                name="submit"
                type="submit"
                isLoading={loading}
              >
                {loading ? "" : "Set PIN"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
