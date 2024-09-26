import { useState } from "react";
import TransactionSummary from "../features/transactions/TransactionSummary";
import WalletSummary from "../features/dashboard/WalletSummary";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useGetAllTransactions from "../features/transactions/services/useGetAllTransactions";
import CreatePaymentLinkModal from "../features/dashboard/CreatePaymentLinkModal"; // Your existing modal
import TransferFromWalletModal from "../features/dashboard/TransferFromWalletModal"; // Import the transfer modal

export default function Dashboard() {
  const navigate = useNavigate();
  const { data } = useGetAllTransactions();
  const transactions = data?.data ?? [];
  
  // State for managing modals
  const [isCreatePaymentLinkModalOpen, setCreatePaymentLinkModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false); // State for transfer modal

  return (
    <div className="w-full h-full grid grid-rows-[35%_65%] gap-3 py-6 ">
      <WalletSummary />
      <div className="w-full h-full rounded-xl flex flex-col gap-1 py-6">
        <div className="w-full flex justify-between items-center py-2 px-3">
          <h1 className="font-semibold text-xl">Recent History</h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate("/transactions")}
              className="py-1 px-2 rounded-md bg-primary text-white text-base font-medium"
            >
              See more
            </Button>
          </div>
        </div>
        <TransactionSummary transactions={transactions} />
      </div>

      {/* Create Payment Link Modal */}
      <CreatePaymentLinkModal
        isOpen={isCreatePaymentLinkModalOpen}
        onOpenChange={() => setCreatePaymentLinkModalOpen(false)} // Close modal
      />

      {/* Transfer From Wallet Modal */}
      <TransferFromWalletModal
        isOpen={isTransferModalOpen}
        onOpenChange={() => setTransferModalOpen(false)} // Close modal
      />
    </div>
  );
}
