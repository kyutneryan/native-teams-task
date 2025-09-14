import {
  BalancesResponse,
  TransactionParams,
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
}
