import { AuthService } from "@/api/services/auth";
import { CommonService } from "@/api/services/common";
import { Transaction, TransactionParams } from "@/models/commmon";
import { setIsLoggedIn, setToken, useAppDispatch } from "@/store";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(data.auth.access_token));
    },
  });
};

export const useBalancesQuery = () => {
  return useQuery({
    queryKey: ["balances"],
    queryFn: CommonService.getBalances,
    select: (res) => res?.data,
  });
};

export const useLatestTransactionsQuery = () => {
  return useQuery({
    queryKey: ["latest-transactions"],
    queryFn: () => CommonService.getTransactions({ per_page: 3 }),
    select: (res) => res.data.items,
  });
};

export const useTransactionsQuery = (data: TransactionParams) => {
  return useInfiniteQuery({
    queryKey: ["transactions", data],
    queryFn: ({ pageParam }) =>
      CommonService.getTransactions({ ...data, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.current_page < lastPage.data.last_page
        ? lastPage.data.current_page + 1
        : undefined;
    },
    select: (res) =>
      res?.pages?.reduce<Transaction[]>(
        (acc, curr) => [...(acc || []), ...curr.data.items],
        []
      ),
  });
};
