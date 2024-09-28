export interface RegisterCredentials {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
}

export interface VerifyEmailCredentials {
  otp: string;
  email: string;
}

export interface VerifyEmailResponse {
  message: string;
  data: {
    access_token: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
}

export interface LoginCredentials {
  id: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
}

export interface ResendOTPCredentials {
  email: string;
}

export interface ResendOTPResponse {
  message: string;
  status: string;
}

export interface ChangePasswordCredentials {
  old_password: string;
  new_password: string;
  confirm: string;
}

export interface ChangePasswordResponse {
  message: string;
  statusCode: string;
}

export interface RequestPasswordResetCredentials {
  email: string;
}

export interface RequestPasswordResetResponse {
  message: string;
  status: string;
}

export interface CreateWalletResponse {
  message: string;
  statusCode: string;
}
export interface GetWalletResponse {
  message: string;
  wallet: {
    id: number;
    balance: number;
    user: number;
  };
}

export interface Transaction {
  id: number;
  mode: string;
  sender: User;
  receiver: User;
  amount: number;
  type: string;
  description: string;
  date: string;
  status: "Pending" | "Completed" | "Failed" | "Refunded" | "Cancelled"; // Adjust according to possible statuses
}

export interface Wallet {
  id: number;
  wallet: number;
  amount: number;
  type: string;
  date: string;
}

export interface TransactionTable {
  id: number;
  mode: string;
  sender: string;
  receiver: string;
  amount: number;
  type: string;
  description: string;
  date: string;
  status: "Pending" | "Completed" | "Failed" | "Refunded" | "Cancelled"; // Adjust according to possible statuses
}

export interface TransferRequest {
  recipient: string;
  amount: number;
  description: string;
  pin: string;
}

export interface WithdrawRequest {
  amount: number;
  pin: string;
}

export interface AllTransactionsResponse {
  message: string;
  data: Transaction[];
}

export interface WalletHistoryResponse {
  message: string;
  data: Wallet[];
}
export interface TransactionResponse {
  message: string;
  data: Transaction;
}

export interface AccountDetailsResponse {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  expiry_date_in_utc: string;
  statusCode: number;
}

export interface GenerateAccountDetailsRequest {
  amount: number;
}

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
}

export interface DisputeResponse {
  message: string;
  data: Dispute[];
}

export interface Dispute {
  id: number;
  transaction: Transaction;
  reason: string;
  evidence: string;
}
