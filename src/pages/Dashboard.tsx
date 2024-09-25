import TransactionSummary from "../features/transactions/TransactionSummary";
import WalletSummary from "../features/dashboard/WalletSummary";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useGetAllTransactions from "../features/transactions/services/useGetAllTransactions";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data} = useGetAllTransactions();
  const transactions = data?.data ?? [];

  return (
    <div className="w-full h-full grid grid-rows-[35%_65%] gap-3">
      <WalletSummary />
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
      </div>
    </div>
  );
}
