import { useState } from "react";
import TransactionSummary from "../features/transactions/TransactionSummary";
import WalletSummary from "../features/dashboard/WalletSummary";
import {Spinner } from "@nextui-org/react";
 import useGetAllTransactions from "../features/transactions/services/useGetAllTransactions";
import CreatePaymentLinkModal from "../features/dashboard/CreatePaymentLinkModal"; // Your existing modal
import TransferFromWalletModal from "../features/dashboard/TransferFromWalletModal"; // Import the transfer modal
import MobileTransactionSummary from "../features/transactions/MobileTransactionSummary";

export default function Dashboard() {
  const { data, isLoading } = useGetAllTransactions();
  const transactions = data?.data ?? [];
  
  // State for managing modals
  const [isCreatePaymentLinkModalOpen, setCreatePaymentLinkModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false); // State for transfer modal

  if(!transactions) return <Spinner color="primary"/>

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col lg:grid gap-6 p-4 ">
      <WalletSummary />
    <div className="w-full h-full flex flex-col rounded-xl gap-2 lg:py-2 mb-24">
        <TransactionSummary transactions={transactions} />
        <MobileTransactionSummary transactions={transactions} isLoading={isLoading}/>
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
