import { BalancesResponse, TransactionsResponse } from "@/models/commmon";
import $apiClient from "..";

export class CommonService {
  static getBalances() {
    return $apiClient.get<BalancesResponse>("/balances");
  }
  static getTransactions({ per_page }: { per_page?: number }) {
    return $apiClient.get<TransactionsResponse>("/transactions", {
      params: { per_page },
    });
  }
}
