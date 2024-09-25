import {useState } from "react";
import { parseDate, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import { TbCalculator, TbCurrencyNaira } from "react-icons/tb";
import TransactionTabs from "../features/transactions/TransactionTabs";
import TransactionWidget from "../features/transactions/TransactionWidget";
import TransactionSummary from "../features/transactions/TransactionSummary";
import Filter from "../components/Filter";
import useGetAllTransactions from "../features/transactions/services/useGetAllTransactions";
import useGetIncomingTransactions from "../features/transactions/services/useGetIncomingTransactions";
import useGetOutgoingTransactions from "../features/transactions/services/useGetOutgoingTransactions";
import {
  getTotalAmount,
  getTransactionCount,
  getTransactionsBetweenDates,
  transactionStatuses,
} from "../utils/helpers";

export default function Transactions() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentTab, setCurrentTab] = useState<string>("all");

const incomingTransactions = useGetIncomingTransactions();
const outgoingTransactions = useGetOutgoingTransactions();
const allTransactions = useGetAllTransactions();

let transactionData;

switch (currentTab) {
  case "incoming":
    transactionData = incomingTransactions;
    break;
  case "outgoing":
    transactionData = outgoingTransactions;
    break;
  default:
    transactionData = allTransactions;
}


  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [fromDate, setFromDate] = useState(
    parseDate(oneWeekAgo.toISOString().split("T")[0])
  );

  const [toDate, setToDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  const handleFromDateChange = (date: CalendarDate) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: CalendarDate) => {
    setToDate(date);
  };

  const { data} = transactionData;
    const transactions = data?.data || [];

  // Filter transactions based on selected date range
  const filteredTransactions = getTransactionsBetweenDates(
    transactions,
    fromDate.toDate(getLocalTimeZone()), // Convert to Date
    toDate.toDate(getLocalTimeZone()) // Convert to Date
  );

  const transactionsFiltered = selectedFilter == "All"
    ? filteredTransactions
    : filteredTransactions.filter(transaction => transaction.status == selectedFilter);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <TransactionTabs currentTab={currentTab} setCurrentTab={setCurrentTab}  />
      <div className="flex gap-6">
        <TransactionWidget
          icon={<TbCurrencyNaira color="blue" size={30} />}
          title="Transactions Value"
          value={getTotalAmount(filteredTransactions)}
        />
        <TransactionWidget
          icon={<TbCalculator color="blue" size={30} />}
          title="Transaction Volume"
          value={getTransactionCount(filteredTransactions)}
        />
      </div>
      <div className="w-full h-full rounded-xl flex flex-col gap-1">
        <div className="w-full flex items-center gap-3 font-semibold py-2 px-3">
          <DatePicker
            className="max-w-[150px]"
            aria-label="From Date"
            value={fromDate}
            onChange={handleFromDateChange}
          />
          <p>to</p>
          <DatePicker
            className="max-w-[150px]"
            aria-label="To Date"
            value={toDate}
            onChange={handleToDateChange}
          />
          <Filter
            options={transactionStatuses}
            selectedValue={selectedFilter}
            onSelectChange={handleFilterChange}
          />
        </div>
        <TransactionSummary transactions={transactionsFiltered} />
      </div>
    </div>
  );
}
