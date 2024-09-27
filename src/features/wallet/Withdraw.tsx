import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { useState } from "react";
import useGetWallet from "./services/useGetWallet";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OtpInput from "../auth/OtpInput";
import useWithdraw from "./services/useWithdraw";

export default function Withdraw() {
    const [amount, setAmount] = useState<string>("");
    const [otp, setOtp] = useState(""); // State for OTP
  const { mutate, isPending: isLoading } = useWithdraw();
  const { data } = useGetWallet();
  const wallet = data?.wallet;
  const queryClient = useQueryClient()

  const handleWithdraw =() => {
    const numericAmount = +amount;
  
    // Check if amount is greater than wallet balance
    if (numericAmount > (wallet?.balance ?? 0)) {
      toast.error("Insufficient funds in your wallet."); // Alert user of insufficient funds
      return; // Ensure the function stops execution here
    }
    mutate({amount : numericAmount, pin: otp }, {
        onSuccess: () => {
          setAmount("");
          setOtp("");
          queryClient.invalidateQueries({ queryKey: ['wallet'] });  // R}}efresh wallet balance
          queryClient.invalidateQueries({ queryKey: ['transactions'] });  // Refresh transaction history
        },
      })

    console.log({numericAmount, otp});

  } 
  return (
    <div className="w-full h-full">
      <Card className="w-full p-1">
        <CardHeader className="flex items-center justify-center w-full">
          <h3 className="text-xl font-semibold text-primary">Withdraw</h3>
        </CardHeader>
        <CardBody className="px-6 flex justify-center items-center space-y-4">
          <Input
            name="amount"
            value={amount} // Bind input value to state
            onChange={(e) => setAmount(e.target.value)} // Update state on change
            placeholder="Amount"
            labelPlacement="outside"
            className="max-w-sm"
            classNames={{ label: "text-lg" , innerWrapper: "h-12"}}
            isRequired
            label="Amount"
            variant="bordered"
            size="lg"
            startContent={<TbCurrencyNaira size={25} color="blue" />}
            type="text"
            isDisabled={isLoading} // Disable input when loading
          />
           <div className="flex flex-col gap-3 items-center justify-center">
              <p className="text-lg font-medium">Input your transaction pin</p>
              <OtpInput
                onChange={setOtp} // Update OTP state when changed
                length={4} // Number of OTP inputs
              />
            </div>
          <div className="w-full flex justify-center">
            <Button
              isDisabled={isLoading}
              color="primary"
              onPress={handleWithdraw}
              isLoading={isLoading}
            >
              Withdraw
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
