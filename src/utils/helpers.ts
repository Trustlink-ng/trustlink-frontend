import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Transaction } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const setTokenWithExpiry = (key: string, token: string, expiryInMs: number) => {
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

export function formatBalance({ country, balance }: CurrencyFormatOptions): string {
  let currencyCode: string;
  let locale: string;

  switch (country.toLowerCase()) {
      case 'nigeria':
          currencyCode = 'NGN';
          locale = 'en-NG';
          break;
      case 'united states':
          currencyCode = 'USD';
          locale = 'en-US';
          break;
      case 'euro':
          currencyCode = 'EUR';
          locale = 'en-EU';
          break;
      // Add more countries and their respective currency codes and locales here
      default:
          currencyCode = 'USD'; // default to USD if country is not listed
          locale = 'en-US';
          break;
  }


  const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });

  return formatter.format(balance);
}

export const getTotalAmount = (transactions: Transaction[] | []): number => {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
};

export const getTransactionCount = (transactions: Transaction[] | []): string => {
  return transactions.length.toString();
};

export const getTransactionsBetweenDates = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};



const columns = [
  { name: "Transaction ID", uid: "id" },
  { name: "Sender", uid: "sender" },
  { name: "Receiver", uid: "receiver" },
  { name: "Amount", uid: "amount" },
  { name: "Description", uid: "description" },
  { name: "Date", uid: "date" },
  { name: "Status", uid: "status" },
];

export const transactionStatuses = [
  { value: "All", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
  { value: "Refunded", label: "Refunded" },
];





export { columns };

