import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import useGenerateAccountDetails from "./services/useGenerateAccount";
import { TbCurrencyNaira } from "react-icons/tb";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FundWallet() {
  const [amount, setAmount] = useState<string>("");
  const numericAmount = +amount;

  const { data, isLoading, refetch } = useGenerateAccountDetails(numericAmount);

  const [isInvalid, setIsInvalid] = useState(true);

  useEffect(() => {
    if (numericAmount > 0) {
      setIsInvalid(false);
    }
  }, [numericAmount]);

  const handleGenerateAccount = () => {
    if (!numericAmount || numericAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    refetch(); // Trigger the query when the button is clicked
  };

  return (
    <div className="w-full">
      <Card className="w-full h-full p-1">
        <CardHeader className="flex items-center justify-center w-full">
          <h3 className="text-lg: lg:text-xl font-semibold text-primary">
            Fund Wallet
          </h3>
        </CardHeader>
        <CardBody className="px-6 flex justify-center items-center gap-8">
          <Input
            name="amount"
            value={amount} // Bind input value to state
            onChange={(e) => setAmount(e.target.value)} // Update state on change
            placeholder="Amount"
            labelPlacement="outside"
            className="max-w-sm"
            classNames={{ label: "text-lg" }}
            isRequired
            label="Amount"
            variant="bordered"
            size="lg"
            startContent={<TbCurrencyNaira size={25} />}
            type="text"
            isDisabled={isLoading} // Disable input when loading
          />
          <div className="w-full flex justify-center">
            <Button
              isDisabled={isLoading || isInvalid}
              color="primary"
              onPress={handleGenerateAccount}
              isLoading={isLoading}
              
            >
              {isLoading
                ? ""
                : data
                ? "Generate new account"
                : "Generate Account"}
            </Button>
          </div>

          {data && (
            <div className="flex gap-3 flex-col items-center justify-center">
              <h3 className="text-xl lg:text-xl font-semibold text-primary">
                Account Details
              </h3>
              <div className="flex items-center justify-center">
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(data.account_number);
                    toast.success("Account number copied to clipboard!"); // Notify user
                  }}
                  className="cursor-pointer text-lg font-semibold text-blue-600 hover:underline"
                >
                  {data.account_number}
                </span>
              </div>
              <h4>Account Name: {data.account_name}</h4>
              <h4>Bank Name: {data.bank_name}</h4>
              <h4>
                Expiry Date:{" "}
                {new Date(data.expiry_date_in_utc).toLocaleString()}
              </h4>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
