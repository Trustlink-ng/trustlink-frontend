import OtpInput from "../auth/OtpInput";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import useUpdateTransactionPin from "./services/useUpdateTransactionPin";
import { toast } from "react-toastify";

export default function SetTransactionPin() {
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const { mutate, isPending } = useUpdateTransactionPin();
 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin.length === 4 && newPin.length === 4 && confirm.length === 4) {
      if (newPin !== confirm) {
        toast.error("New PIN and confirmation PIN do not match");
        return;
      }
      mutate({
        old_pin: pin,
        new_pin: newPin,
        confirm,
      });
    } else {
      toast.error("Invalid Transaction PIN. Please ensure all fields are 4 digits.");
    }
  };

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full flex items-center justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <h1 className="lg:text-4xl text-2xl font-medium">
          Change Transaction PIN
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <p className="text-slate-500 text-base text-center">
              Set your transaction PIN
            </p>
          </div>
          <div className="py-6 space-y-6 w-full">
            <div className="flex flex-col gap-3 items-center justify-center">
              <h2 className="font-semibold text-xl text-primary">
                Enter your transaction PIN
              </h2>
              <OtpInput id={"old"} length={4} onChange={(value) => setPin(value)} />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center">
              <h2 className="font-semibold text-xl text-primary">
                Enter the new transaction PIN
              </h2>
              <OtpInput id={"new"} length={4} onChange={(value) => setNewPin(value)} />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center">
              <h2 className="font-semibold text-xl text-center text-primary">
                Confirm transaction PIN
              </h2>
              <OtpInput id={"confirm-otp"} length={4} onChange={(value) => setConfirm(value)}  />
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                className="bg-primary w-full max-w-xs outline-none data-[focus-visible=true]:outline-0 text-white"
                size="lg"
                radius="full"
                name="submit"
                type="submit"
                isLoading={isPending}
                isDisabled={isPending}
              >
                Update PIN
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
