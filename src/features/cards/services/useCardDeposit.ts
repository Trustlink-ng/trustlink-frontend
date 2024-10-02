import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface CardDepositRequest {
  number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  amount: number;
}

interface CardDepositResponse {
  amount: number;
  amount_charged: number;
  auth_model: string;
  currency: string;
  fee: number;
  vat: number;
  response_message: string;
  payment_reference: string;
  status: string;
  transaction_reference: string;
  metadata: {
    gateway_code: string;
    stan: string;
    receipt: string;
    support_message: string;
  };
  card: {
    card_type: string;
    first_six: string;
    last_four: string;
    expiry: string;
  };
}

const sanitizeCardNumber = (number: string) => {
  return number.replace(/\s+/g, "");
};

// Validate expiry month and year
const validateExpiry = (expiry: string) => {
  const [month, year] = expiry.split("/");

  const expiryMonth = parseInt(month, 10);
  const expiryYear = parseInt(year, 10);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  // Check for valid month and year
  if (expiryMonth < 1 || expiryMonth > 12) {
    toast.error("Invalid expiry month. Must be between 01 and 12.", {
      toastId: "Invalid month",
    });
    return null;
  }

  if (
    expiryYear < currentYear ||
    (expiryYear === currentYear && expiryMonth < currentMonth)
  ) {
    toast.error("Invalid expiry year. The expiry date is in the past.", {
      toastId: "Invalid year",
    });
    return null;
  }

  return { expiry_month: month, expiry_year: year };
};

const depositCardToWallet = async (
  depositData: CardDepositRequest
): Promise<CardDepositResponse> => {
  const { data } = await axiosInstance.post<CardDepositResponse>(
    "/api/deposit/card",
    depositData
  );
  return data;
};

export default function useCardDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cardData: {
      number: string;
      cvv: string;
      expiry: string;
      name: string;
      amount: number;
    }) => {
      const sanitizedNumber = sanitizeCardNumber(cardData.number);

      const expiryData = validateExpiry(cardData.expiry);

      if (!expiryData) {
        throw new Error("Invalid expiry data");
      }

      const payload: CardDepositRequest = {
        number: sanitizedNumber,
        cvv: cardData.cvv,
        expiry_month: expiryData.expiry_month,
        expiry_year: expiryData.expiry_year,
        amount: cardData.amount,
      };

      return await depositCardToWallet(payload);
    },
    onSuccess: (data) => {
      toast.success(data.response_message, {
        toastId: data.transaction_reference,
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-history"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: AxiosError) => {
      toast.error("Invalid card details", {
        toastId: error.message,
      });
    },
  });
}
