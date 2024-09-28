import { useState, useMemo} from "react";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import useGetBanks from "./services/useGetBanks";
import useGetBank from "./services/useGetBank";
import useSaveBankAccount from "./services/useSaveBankAccount";
import useUpdateBankAccount from "./services/useUpdateBankAccount";

export default function AddBankAccount() {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const { data, isLoading } = useGetBanks();
  const [selectedBank, setSelectedBank] = useState<{ label: string, value: string }>();
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

  // Handle the bank account submission
  const handleSubmit = async () => {
    if (selectedBank && accountNumber) {
      saveBank({
        code: selectedBank?.value,
        account_number: accountNumber,
      });
    }
  };

  // Handle the bank account update
  const handleUpdate = async () => {
    if (selectedBank && accountNumber) {
      updateBank({
        code: selectedBank?.value,
        account_number: accountNumber,
      },{onSuccess() {
        setSelectedBank(undefined)
        setAccountNumber("")
      },});
    }
  };

  // Loading state for fetching data
  if (isLoading || isFetchingBank) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
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
        selectedKeys={selectedBank ? new Set([selectedBank.value]) : undefined} // Use Set for selectedKeys
        onSelectionChange={(key) => {
          const selectedBankCode = Array.from(key).join(''); // Extract value from Set
          const bank = allBanks.find((b) => b.value === selectedBankCode); // Match selected value
          if (bank) {
            setSelectedBank(bank); // Update selected bank
          }
        }}
      >
        {(bank) => (
          <SelectItem key={bank.value} className="capitalize">
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
        />
      </div>
      <div>
        {userBank?.data ? (
          <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="mt-4 p-2 bg-blue-500 text-white"
          >
            {isUpdating ? <Spinner size="sm" /> : "Update Bank Account"}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="mt-4 p-2 bg-blue-500 text-white"
          >
            {isSaving ? <Spinner size="sm" /> : "Save Bank Account"}
          </Button>
        )}
      </div>
    </div>
  );
}
