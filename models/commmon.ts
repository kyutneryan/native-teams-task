export interface Balance {
  id: number;
  user_id: string;
  currency_id: number;
  available_balance: string;
  current_balance: string;
  reserved_balance: string;
  reference_number: string;
}

export interface BalancesResponse {
  data: Balance[];
  message: string;
  status: number;
  type: string;
}

export interface Transaction {
  id: number;
  wallet_id: number;
  type: string;
  status: string;
  reason: string;
  amount: number;
  currency_id: number;
  created_at: string;
}

export interface TransactionsResponse {
  data: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: number;
    items: Transaction[];
  };
  message: string;
  status: number;
  type: string;
}

export interface TransactionResponse {
  data?: Transaction;
  message: string;
  status: number;
  type: string;
}

export interface TransactionParams {
  page?: number;
  per_page?: number;
  wallet_id?: string;
  type?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

export interface PayoutRequest {
  wallet_id: number;
  provider: "bank" | "card";
  amount: number;
  currency_id: number;
  bank_id?: number;
}

export interface PayoutResponse {
  data: {
    id: number;
    status: string;
    amount: number;
    provider: string;
    wallet_id: number;
    currency_id: number;
    created_at: string;
  };
  message: string;
  status: number;
  type: string;
}
