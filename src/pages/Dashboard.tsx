import { useState } from "react";
import TransactionSummary from "../features/transactions/TransactionSummary";
import WalletSummary from "../features/dashboard/WalletSummary";
import { Button, Spinner } from "@nextui-org/react";
import useGetAllTransactions from "../features/transactions/services/useGetAllTransactions";
import CreatePaymentLinkModal from "../features/dashboard/CreatePaymentLinkModal"; // Your existing modal
import TransferFromWalletModal from "../features/dashboard/TransferFromWalletModal"; // Import the transfer modal
import MobileTransactionSummary from "../features/transactions/MobileTransactionSummary";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { data, isLoading, isSuccess } = useGetAllTransactions();
  const transactions = data?.data ?? [];
  const navigate = useNavigate();

  // State for managing modals
  const [isCreatePaymentLinkModalOpen, setCreatePaymentLinkModalOpen] =
    useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false); // State for transfer modal

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner color="primary" />
      </div>
    );

  if (isSuccess && transactions.length == 0) {
    return (
      <div className="h-full p-4 ">
        <div className="mx-3 md:mx-24">
          <WalletSummary />
        </div>
        <div className="p-6 text-2xl text-center overflow-hidden font-semibold text-primary lg:text-4xl flex items-center justify-center">
          Perform a transaction to view the dashboard
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            src="/no-trans.png"
            className="w-32 md:w-64"
            alt="Logo for no Account"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`"w-full h-full gap-2 overflow-auto flex flex-col md:px-6 p-2 lg:p-4 "`}
    >
      <WalletSummary />
      <div className="w-full h-full grow flex flex-col rounded-xl gap-2 lg:py-2 lg:mb-24">
        <div className="w-full h-full rounded-xl flex flex-col gap-1">
          <div className="w-full flex justify-between items-center py-2 px-3">
            <h1 className="font-semibold text-xl">Recent History</h1>
            <Button
              onClick={() => navigate("/transactions")}
              className="py-1 px-2 rounded-md bg-primary text-white text-base font-medium"
            >
              See more
            </Button>
          </div>
          <TransactionSummary transactions={transactions} />
          <MobileTransactionSummary
            transactions={transactions}
            isLoading={isLoading}
          />
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
    </div>
  );
}
