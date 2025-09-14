import {
  BalancesResponse,
  PayoutRequest,
  PayoutResponse,
  TransactionParams,
  TransactionResponse,
  TransactionsResponse,
} from "@/models/commmon";
import $apiClient from "..";

export class CommonService {
  static getBalances() {
    return $apiClient.get<BalancesResponse>("/balances");
  }
  static getTransactions({ per_page, page }: TransactionParams) {
    return $apiClient.get<TransactionsResponse>("/transactions", {
      params: { per_page, page },
    });
  }
  static getTransactionById({ id }: { id: number }) {
    return $apiClient.get<TransactionResponse>(`/transactions/${id}`);
  }
  static createPayout(data: PayoutRequest) {
    return $apiClient.post<PayoutResponse>("/payouts", data);
  }
}
