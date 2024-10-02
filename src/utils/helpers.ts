import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Transaction, Wallet } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setTokenWithExpiry = (
  key: string,
  token: string,
  expiryInMs: number
) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiryInMs;
  const tokenWithExpiry = {
    value: token,
    expiry: expiryDate,
  };
  localStorage.setItem(key, JSON.stringify(tokenWithExpiry));
};

export const getTokenWithExpiry = (key: string) => {
  const tokenItem = localStorage.getItem(key);
  if (!tokenItem) return null;

  const tokenWithExpiry = JSON.parse(tokenItem);
  const now = new Date();

  if (now.getTime() > tokenWithExpiry.expiry) {
    localStorage.removeItem(key); // Remove expired token
    return null;
  }

  return tokenWithExpiry.value;
};

export function getInitials(name: string): string {
  // Split the name into words
  const words = name.split(" ");
  const initials = words?.[0]?.[0] + words?.[1]?.[0];
  return initials;
}

type CurrencyFormatOptions = {
  country: string;
  balance: number;
};

export function formatBalance({
  country,
  balance,
}: CurrencyFormatOptions): string {
  let currencyCode: string;
  let locale: string;

  switch (country.toLowerCase()) {
    case "nigeria":
      currencyCode = "NGN";
      locale = "en-NG";
      break;
    case "united states":
      currencyCode = "USD";
      locale = "en-US";
      break;
    case "euro":
      currencyCode = "EUR";
      locale = "en-EU";
      break;
    // Add more countries and their respective currency codes and locales here
    default:
      currencyCode = "USD"; // default to USD if country is not listed
      locale = "en-US";
      break;
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(balance);
}

export const getTotalAmount = (
  transactions: Transaction[] | Wallet[] | []
): number => {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
};

export const getTransactionCount = (
  transactions: Transaction[] | Wallet[] | []
): string => {
  return transactions.length.toString();
};

export const getTransactionsBetweenDates = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  // Set start date to 00:00:00
  const normalizedStartDate = new Date(startDate);
  normalizedStartDate.setHours(0, 0, 0, 0);

  // Set end date to 23:59:59
  const normalizedEndDate = new Date(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= normalizedStartDate &&
      transactionDate <= normalizedEndDate
    );
  });
};

export const getWalletHistoryBetweenDates = (
  transactions: Wallet[],
  startDate: Date,
  endDate: Date
): Wallet[] => {
  // Set start date to 00:00:00
  const normalizedStartDate = new Date(startDate);
  normalizedStartDate.setHours(0, 0, 0, 0);

  // Set end date to 23:59:59
  const normalizedEndDate = new Date(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= normalizedStartDate &&
      transactionDate <= normalizedEndDate
    );
  });
};

export function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

export const formatDate = (dateString: string | number): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Get the difference in time (milliseconds)
  const diffTime = now.getTime() - date.getTime();

  // Convert milliseconds into days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  // Check if it's today
  if (diffDays === 0) {
    return `Today, ${date.toLocaleTimeString([], options)}`;
  }

  // Check if it's yesterday
  if (diffDays === 1) {
    return `Yesterday, ${date.toLocaleTimeString([], options)}`;
  }

  // Check if it's within the last 7 days
  if (diffDays > 1 && diffDays <= 7) {
    const dayOfWeek = date.toLocaleDateString([], { weekday: 'long' });
    return `${dayOfWeek}, ${date.toLocaleTimeString([], options)}`;
  }

  // For dates older than 7 days, format as dd/mm/yy
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year

  return `${day}/${month}/${year}, ${date.toLocaleTimeString([], options)}`;
};



const columns = [
  { name: "TID", uid: "id" },
  { name: "Sender", uid: "sender" },
  { name: "Amount", uid: "amount" },
  { name: "Description", uid: "description" },
  { name: "Date", uid: "date" },
  { name: "Status", uid: "status" },
];
const walletColumns = [
  { name: "WID", uid: "id" },
  { name: "Amount", uid: "amount" },
  { name: "Date", uid: "date" },
];

export const transactionStatuses = [
  { value: "All", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Refunded", label: "Refunded" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

export { columns, walletColumns };
