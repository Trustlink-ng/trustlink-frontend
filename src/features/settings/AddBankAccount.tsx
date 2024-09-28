import { useState, useMemo } from "react";
import { Button, Card, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import useGetBanks from "./services/useGetBanks";
import useGetBank from "./services/useGetBank";
import useSaveBankAccount from "./services/useSaveBankAccount";
import useUpdateBankAccount from "./services/useUpdateBankAccount";
import { toast } from "react-toastify";

export default function AddBankAccount() {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const { data, isLoading } = useGetBanks();
  const [selectedBank, setSelectedBank] = useState<{
    label: string;
    value: string;
  }>();
  const { data: userBank, isLoading: isFetchingBank } = useGetBank();
  const { mutate: saveBank, isPending: isSaving } = useSaveBankAccount();
  const { mutate: updateBank, isPending: isUpdating } = useUpdateBankAccount();

  // Map banks to an array of objects containing label and value (for Select)
  const allBanks = useMemo(() => {
    const uniqueBanks = new Map();
    (data?.banks || []).forEach((bank) => {
      uniqueBanks.set(bank.code, { label: bank.name, value: bank.code }); // Map to label and value
    });

    // Convert map to array and sort banks alphabetically by name
    return Array.from(uniqueBanks.values()).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [data]);


  const userBankName = allBanks.filter((bank) => bank.value === userBank?.data?.bankCode )[0]

  // Handle the bank account submission
  const handleSubmit = async () => {
    if (selectedBank && accountNumber.length == 10) {
      saveBank({
        code: selectedBank?.value,
        account_number: accountNumber,
      });
    }
  };

  // Handle the bank account update
  const handleUpdate = async () => {
    if (selectedBank && accountNumber.length == 10) {
      updateBank(
        {
          code: selectedBank?.value,
          account_number: accountNumber,
        },
        {
          onSuccess() {
            setSelectedBank(undefined);
            setAccountNumber("");
          },
        }
      );
    }
  };

  if (isFetchingBank) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3 lg:flex-row  gap-12">
      <div className="flex flex-col gap-6 ">
        <div className="w-full">
          <h1 className="lg:text-4xl text-xl font-medium">
            {!userBank?.data ? "Add" : "Update"} Bank Account
          </h1>
        </div>
        <Select
          className="max-w-xs"
          size="lg"
          aria-label="Banks"
          isLoading={isLoading}
          placeholder="Select a Bank"
          items={allBanks}
          selectedKeys={
            selectedBank ? new Set([selectedBank.value]) : undefined
          } // Use Set for selectedKeys
          onSelectionChange={(key) => {
            const selectedBankCode = Array.from(key).join(""); // Extract value from Set
            const bank = allBanks.find((b) => b.value === selectedBankCode); // Match selected value
            if (bank) {
              setSelectedBank(bank); // Update selected bank
            }
          }}
        >
          {(bank) => (
            <SelectItem key={bank.value} className="capitalize p-2 text-xl">
              {bank.label}
            </SelectItem>
          )}
        </Select>
        <div>
          <Input
            type="text"
            aria-label="Account Number"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="max-w-xs"
            size="lg"
          />
        </div>
        <div>
          {userBank?.data ? (
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              size="lg"
              className="mt-4 p-4 bg-blue-500 text-white"
            >
              {isUpdating ? <Spinner size="sm" /> : "Update Bank Account"}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              size="lg"
              className="mt-4 p-4 bg-blue-500  text-white"
            >
              {isSaving ? <Spinner size="sm" /> : "Save Bank Account"}
            </Button>
          )}
        </div>
      </div>
      {userBank?.data && (
        <Card className="flex gap-3 lg:m-2 md:max-w-[80%] flex-col font-semibold items-center px-6 py-4 justify-center">
          <h3 className="text-xl lg:text-xl font-semibold text-primary">
           Current Account Details
          </h3>
          <h3 className="text-lg font-semibold">Click to copy</h3>
          <div className="flex items-center justify-center">
            <span
              onClick={() => {
                navigator.clipboard.writeText(userBank?.data?.accountNumber);
                toast.success("Account number copied to clipboard!"); // Notify user
              }}
              className="cursor-pointer text-xl lg:text-2xl font-semibold text-blue-600 hover:underline"
            >
              {userBank?.data?.accountNumber}
            </span>
          </div>
          <h4 className="text-md lg:text-xl">Account Name:<span className="text-primary"> {userBank?.data?.accountName}</span></h4>
          <h4 className="text-md lg:text-xl">Bank Name: <span className="text-primary">{userBankName?.label}</span></h4>
        </Card>
      )}
    </div>
  );
}
