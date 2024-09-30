import { useNavigate } from "react-router-dom";
import { Transaction } from "../../utils/types"; // Import Transaction type
import { formatBalance } from "../../utils/helpers";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Chip, ChipProps, Spinner } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Pending: "warning",
  Completed: "success",
  Refunded: "danger",
  Cancelled: "danger",
};

export default function MobileTransactionSummary({
  transactions,
  isLoading,
}: {
  transactions: Transaction[] | [];
  isLoading: boolean;
}) {
  const navigate = useNavigate();

  const handleRowClick = (transactionId: number) => {
    navigate(`/transactions/${transactionId}`);
  };

  const getTransactionName = (transaction: Transaction) => {
    if (transaction?.type === "DEBIT") {
      return transaction?.receiver?.firstName || "Kora Payment Link";
    } else if (transaction?.type === "CREDIT") {
      return transaction?.sender?.firstName || "Kora Payment Link";
    }
    return "Kora Payment Link";
  };

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction?.type === "DEBIT") {
      return <FaArrowUp color="blue" />;
    } else {
      return <FaArrowDown color="blue" />;
    }
  };

  if (isLoading) return <Spinner className="lg:hidden" />;

  return (
    <div className="lg:hidden mac-h-[700px] w-full">
      <ul className="h-full divide-y-2 min-h-32 divide-main bg-white px-2 py-2 rounded-lg">
        {transactions.length == 0 ? <p className="w-full text-center h-full flex items-center justify-center text-xl">No transactions</p> : transactions?.map((transaction) => (
          <li
            className="flex gap-3 bg-white px-2 py-3 cursor-pointer rounded-md hover:bg-slate-200"
            key={transaction?.id}
            onClick={() => handleRowClick(transaction?.id)}
          >
            <div className="flex items-center w-12 h-12 px-4 py-5 bg-primary-50 rounded-full justify-center">
              <div className="text-xl">{getTransactionIcon(transaction)}</div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col  gap-1">
                <h3 className="lg:text-lg font-semibold text-primary ">
                  {getTransactionName(transaction)}
                </h3>
                  <p className="text-sm w-32 capitalize font-semibold text-gray-500 text-ellipsis overflow-hidden truncate">
                    {transaction?.description}
                  </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p
                  className={`${
                    transaction?.type === "CREDIT"
                      ? "text-green-500"
                      : "text-red-500"
                  } lg:text-lg`}
                >
                  {formatBalance({
                    country: "Nigeria",
                    balance: transaction?.amount,
                  })}
                </p>
                  <Chip
                    className="capitalize rounded-sm lg:text-lg"
                    color={statusColorMap[transaction.status] || "default"} // Ensure fallback color
                    size="sm"
                    variant="flat"
                  >
                    {typeof transaction?.status === "string"
                      ? transaction?.status
                      : "Pending"}{" "}
                    {/* Only render if cellValue is a string */}
                  </Chip>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
