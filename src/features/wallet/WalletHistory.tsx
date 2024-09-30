import { formatBalance } from "../../utils/helpers";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Spinner } from "@nextui-org/react";
import { Wallet } from "../../utils/types";

export default function WalletHistory({
  transactions,
  isLoading,
}: {
  transactions: Wallet[] | [];
  isLoading: boolean;
}) {
  const getTransactionIcon = (transaction: Wallet) => {
    if (transaction?.type === "DEBIT") {
      return <FaArrowUp color="blue" />;
    } else {
      return <FaArrowDown color="blue" />;
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="max-h-[700px] h-full grow lg:max-h-3/4">
      <ul className="w-full h-full divide-y-3 divide-main bg-white  rounded-lg overflow-y-scroll">
        {transactions?.map((transaction) => (
          <li
            className="flex gap-3 border-2 border-main hover:bg-slate-200 bg-white px-2 py-3 rounded-md"
            key={transaction?.id}
          >
            <div className="flex items-center w-12 h-12 px-4 py-5 bg-primary-50 rounded-full justify-center">
              <div className="text-xl">{getTransactionIcon(transaction)}</div>
            </div>
            <div className="w-full flex justify-between ">
              <div className="flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-primary "></h3>
                <p className="text-md font-semibold text-gray-500 text-ellipsis overflow-hidden truncate"></p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p
                  className={`${
                    transaction?.type === "CREDIT"
                      ? "text-green-500"
                      : "text-red-500"
                  } text-xl lg:text-2xl`}
                >
                  {formatBalance({
                    country: "Nigeria",
                    balance: transaction?.amount,
                  })}
                </p>
                <p className="text-[10px] text-white bg-gray-500 rounded-full py-0.25 px-[0.3rem]"></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
