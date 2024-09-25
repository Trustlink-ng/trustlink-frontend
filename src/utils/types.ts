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
    user: number
  }
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
  status: 'Pending' | 'Completed' | 'Failed'; // Adjust according to possible statuses
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
  status: 'Pending' | 'Completed' | 'Failed'; // Adjust according to possible statuses
}


export interface AllTransactionsResponse {
  message: string;
  data: Transaction[];
}
export interface TransactionResponse {
  message: string;
  data: Transaction;
}
