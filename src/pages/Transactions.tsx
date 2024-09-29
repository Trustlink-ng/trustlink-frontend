import { useState } from "react";
import {
  parseDate,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";
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
import MobileTransactionSummary from "../features/transactions/MobileTransactionSummary";

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

  const { data, isLoading } = transactionData;
  const transactions = data?.data || [];

  // Filter transactions based on selected date range
  const filteredTransactions = getTransactionsBetweenDates(
    transactions,
    fromDate.toDate(getLocalTimeZone()), // Convert to Date
    toDate.toDate(getLocalTimeZone()) // Convert to Date
  );
  const transactionsFiltered =
    selectedFilter == "All"
      ? filteredTransactions
      : filteredTransactions.filter(
          (transaction) => transaction?.status == selectedFilter
        );

  return (
    <div className="w-full h-full space-y-2 p-2 md:px-6 overflow-auto lg:p-4">
      <TransactionTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex gap-2 lg:gap-6">
        <TransactionWidget
          icon={
            <TbCurrencyNaira
              color="blue"
              className="text-lg md:text-xl lg:text-2xl"
            />
          }
          title="Transactions Value"
          value={getTotalAmount(filteredTransactions)}
        />
        <TransactionWidget
          icon={
            <TbCalculator
              color="blue"
              className="text-lg md:text-xl lg:text-2xl"
            />
          }
          title="Transaction Volume"
          value={getTransactionCount(filteredTransactions)}
        />
      </div>
      <div className="w-full h-full flex flex-col rounded-xl gap-2 ">
        <div className="w-full flex flex-col md:flex-row font-semibold gap-3 py-2 md:py-4">
          <div className="flex items-center gap-3 ">
            <DatePicker
              className="max-w-[160px] lg:max-w-[150px]"
              aria-label="From Date"
              value={fromDate}
              size="lg"
              onChange={handleFromDateChange}
            />
            <p className="text-lg">to</p>
            <DatePicker
              className="max-w-[160px] lg:max-w-[150px]"
              aria-label="To Date"
              value={toDate}
              size="lg"
              onChange={handleToDateChange}
            />
          </div>
          <Filter
            options={transactionStatuses}
            selectedValue={selectedFilter}
            onSelectChange={handleFilterChange}
          />
        </div>
          <TransactionSummary transactions={transactionsFiltered} />
        <MobileTransactionSummary
          transactions={transactionsFiltered}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
