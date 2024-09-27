import { useState, useMemo, useEffect } from "react";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import useGetBanks from "./services/useGetBanks";
import useGetBank from "./services/useGetBank";
import useSaveBankAccount from "./services/useSaveBankAccount";
import useUpdateBankAccount from "./services/useUpdateBankAccount";
import { Bank } from "../../utils/types";

export default function AddBankAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const { data, isLoading } = useGetBanks();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const { data: userBank, isLoading: isFetchingBank } = useGetBank();
  const { mutate: saveBank, isPending: isSaving } = useSaveBankAccount();
  const { mutate: updateBank, isPending: isUpdating } = useUpdateBankAccount();

  const [loadedCount, setLoadedCount] = useState<number>(20); // Start with first 20 items
  const CHUNK_SIZE = 20; // The size of each chunk to load

  // Remove duplicate banks by bank.code and sort alphabetically by name
  const allBanks = useMemo(() => {
    const uniqueBanks = new Map();
    (data?.banks || []).forEach((bank) => {
      uniqueBanks.set(bank.code, bank); // Ensure uniqueness by bank code
    });

    // Convert map to array and sort banks alphabetically by name
    return Array.from(uniqueBanks.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [data]);

  // Paginate banks manually in chunks
  const filteredBanks = useMemo(() => {
    return allBanks.slice(0, loadedCount); // Only show banks based on loaded count
  }, [allBanks, loadedCount]);

  // Infinite scroll hook to load more data when scrolling
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: loadedCount < allBanks.length,
    isEnabled: isOpen, // Only trigger infinite scroll when dropdown is open
    onLoadMore: () => {
      setLoadedCount((prev) => prev + CHUNK_SIZE);
    },
    shouldUseLoader: false,
  });

  // Handle the bank account submission
  const handleSubmit = async () => {
    if (selectedBank && accountNumber) {
      saveBank({
        code: selectedBank?.code,
        account_number: accountNumber,
      });
    }
  };

  // Handle the bank account update
  const handleUpdate = async () => {
    if (selectedBank && accountNumber) {
      updateBank({
        code: selectedBank?.code,
        account_number: accountNumber,
      });
    }
  };

  // Reset loaded count when Select is closed
  useEffect(() => {
    if (!isOpen) {
      setLoadedCount(CHUNK_SIZE); // Reset loaded count when dropdown closes
    }
  }, [isOpen]);

  // Loading state for fetching data
  if (isLoading || isFetchingBank) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col  gap-6 p-6">
      <div className="w-full">
        <h1 className="lg:text-4xl text-xl font-medium">
          Add or Update Bank Account
        </h1>
      </div>
      <Select
        className="max-w-xs"
        classNames={{
          base: "h-12"
        }}
        aria-label="Banks"
        isLoading={isLoading}
        items={filteredBanks}
        placeholder="Select a Bank"
        scrollRef={scrollerRef}
        selectionMode="single"
        onOpenChange={setIsOpen}
        selectedKeys={selectedBank ? [selectedBank.code] : undefined} // Use Set for selectedKeys
        onSelectionChange={(key) => {
          const selectedBankCode = Array.from(key)[0]; // Get the first value from the Set
          const bank = filteredBanks.find((b) => b.code === selectedBankCode);
          console.log(bank);
          if (bank) {
            setSelectedBank(bank); // Update the selected bank state
          }
        }}
      >
        {(bank) => (
          <SelectItem key={bank.code} className="capitalize">
            <div className="p-2">{bank.name}</div>
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
