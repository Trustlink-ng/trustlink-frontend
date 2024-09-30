import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { useEffect, useState } from "react";
import useGetWallet from "./services/useGetWallet";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OtpInput from "../auth/OtpInput";
import useWithdraw from "./services/useWithdraw";
import useGetBank from "../settings/services/useGetBank";
import { Link } from "react-router-dom";

export default function Withdraw() {
  const [amount, setAmount] = useState<string>("");
  const [otp, setOtp] = useState(""); // State for OTP
  const { mutate, isPending: isLoading } = useWithdraw();
  const { data: userbank, isLoading: isGettingBank } = useGetBank();
  const { data } = useGetWallet();
  const wallet = data?.wallet;
  const queryClient = useQueryClient();
  const [isInvalid, setIsInvalid] = useState(true);


  useEffect(() => {
    if (otp.length === 4 && +amount > 0) {
      setIsInvalid(false);
    }
  }, [amount, otp]);

  const handleWithdraw = () => {
    const numericAmount = +amount;

    // Check if amount is greater than wallet balance
    if (numericAmount > (wallet?.balance ?? 0)) {
      toast.error("Insufficient funds in your wallet."); // Alert user of insufficient funds
      return; // Ensure the function stops execution here
    }

    mutate(
      { amount: numericAmount, pin: otp },
      {
        onSuccess: () => {
          setAmount("");
          setOtp("");
          queryClient.invalidateQueries({ queryKey: ["wallet"] }); // R}}efresh wallet balance
          queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Refresh transaction history
        },
      }
    );
  };
  return (
    <div className="w-full h-full">
      <Card className="w-full p-1">
        <CardHeader className="flex items-center justify-center w-full">
          <h3 className="text-xl font-semibold text-primary">Withdraw</h3>
        </CardHeader>
        <CardBody className="px-6 flex justify-center items-center space-y-4">
          {isGettingBank ? (
            <Spinner />
          ) : !userbank?.data.accountNumber ? (
            <div className="flex items-center justify-center gap-3 flex-col ">
              <p className="text-xl font-semibold ">No bank account linked.</p>
              <Button className="bg-primary p-3 text-white ">
                <Link to={"/settings/wallet"}>Add Bank Account</Link>
              </Button>
            </div>
          ) : (
            <>
              <Input
                name="amount"
                value={amount} // Bind input value to state
                onChange={(e) => setAmount(e.target.value)} // Update state on change
                placeholder="Amount"
                labelPlacement="outside"
                className="max-w-sm"
                classNames={{ label: "text-lg", innerWrapper: "h-12" }}
                isRequired
                label="Amount"
                variant="bordered"
                size="lg"
                startContent={<TbCurrencyNaira size={25} color="blue" />}
                type="text"
                isDisabled={isLoading} // Disable input when loading
              />
              <div className="flex flex-col gap-3 items-center justify-center">
                <p className="text-lg font-medium">
                  Input your transaction pin
                </p>
                <OtpInput
                  autoFocus={false}
                  id={"withdraw"}
                  onChange={setOtp} // Update OTP state when changed
                  length={4} // Number of OTP inputs
                />
              </div>
              <div className="w-full flex justify-center">
                <Button
                  isDisabled={isLoading || isInvalid}
                  color="primary"
                  onPress={handleWithdraw}
                  isLoading={isLoading}
                >
                  Withdraw
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
