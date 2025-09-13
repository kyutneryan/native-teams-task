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
  message: "Transactions retrieved successfully";
  status: 200;
  type: "general_success";
}
