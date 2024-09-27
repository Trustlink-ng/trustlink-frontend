import { useState } from "react";
import {
  parseDate,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import Filter from "../components/Filter";

import {
  getWalletHistoryBetweenDates,
  transactionStatuses,
} from "../utils/helpers";
import WalletBalance from "../features/dashboard/WalletBalance";
import useGetWalletHistory from "../features/wallet/services/useGetWalletHistory";
import WalletHistory from "../features/wallet/WalletHistory";
import { CiWallet } from "react-icons/ci";
import { Outlet, useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

export default function Transactions() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const navigate = useNavigate();
  const allTransactions = useGetWalletHistory();

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

  const { data, isLoading } = allTransactions;
  const transactions = data?.data || [];
  console.log(transactions);

  // Filter transactions based on selected date range
  const filteredWalletHistory = getWalletHistoryBetweenDates(
    transactions,
    fromDate.toDate(getLocalTimeZone()), // Convert to Date
    toDate.toDate(getLocalTimeZone()) // Convert to Date
  );

  return (
    <div className="w-full h-full flex flex-col overflow-hidden px-3 lg:grid lg:grid-cols-2 gap-3">
      <div className="w-full h-full flex flex-col gap-3 lg:gap-6">
        <div className="flex flex-col xl:flex-row gap-2">
          <WalletBalance />
          <div className="h-full w-full flex gap-3 p-3 ">
            <div
              onClick={() => navigate("fund")}
              className="w-full flex flex-col items-center bg-white shadow-md rounded-lg py-6 justify-center cursor-pointer "
            >
              <CiWallet className="text-2xl" color="blue" />
              <p className=" font-medium text-primary">Fund Wallet</p>
            </div>
            <div
              onClick={() => navigate("withdraw")}
              className="w-full flex flex-col items-center bg-white shadow-md rounded-lg py-6 justify-center cursor-pointer "
            >
              <FiRefreshCw className="text-2xl" color="blue" />
              <p className=" font-medium text-primary">Withdraw</p>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:px-16">
          <Outlet />
        </div>
      </div>

      <div className="w-full h-full rounded-xl flex flex-col gap-2 px-3">
        <div className="w-full flex  font-semibold gap-3">
          <div className="flex items-center gap-3 ">
            <DatePicker
              className="max-w-[160px] lg:max-w-[150px]"
              aria-label="From Date"
              value={fromDate}
              size="lg"
              onChange={handleFromDateChange}
            />
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
        <WalletHistory
          transactions={filteredWalletHistory}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
