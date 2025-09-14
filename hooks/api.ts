import { AuthService } from "@/api/services/auth";
import { CommonService } from "@/api/services/common";
import {
  BalancesResponse,
  Transaction,
  TransactionParams,
  TransactionsResponse,
} from "@/models/commmon";
import {
  getBalances,
  getTransactions,
  setBalances,
  setIsLoggedIn,
  setToken,
  setTransactions,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
  const dispatch = useAppDispatch();
  const initialBalances = useAppSelector(getBalances);

  const initialData: BalancesResponse = {
    data: initialBalances,
    message: "",
    status: 0,
    type: "",
  };

  return useQuery({
    queryKey: ["balances"],
    queryFn: () =>
      CommonService.getBalances().then((res) => {
        dispatch(setBalances(res.data));
        return res;
      }),
    select: (res) => res.data,
    ...(initialBalances.length ? { initialData } : {}),
  });
};

export const useLatestTransactionsQuery = () => {
  const dispatch = useAppDispatch();
  const initialTransactions = useAppSelector(getTransactions);

  const initialData: TransactionsResponse = {
    data: {
      current_page: 0,
      per_page: 0,
      total: 0,
      last_page: 0,
      has_more: 0,
      items: initialTransactions,
    },
    message: "",
    status: 0,
    type: "",
  };

  return useQuery({
    queryKey: ["latest-transactions"],
    queryFn: () =>
      CommonService.getTransactions({ per_page: 3 }).then((res) => {
        dispatch(setTransactions(res.data.items));
        return res;
      }),
    select: (res) => res.data.items,
    ...(initialTransactions.length ? { initialData } : {}),
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

export const useGetTransactionById = (id: number) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => CommonService.getTransactionById({ id }),
    select: (res) => res?.data,
    enabled: !!id,
  });
};

export const usePayoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommonService.createPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balances"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["latest-transactions"] });
    },
  });
};
