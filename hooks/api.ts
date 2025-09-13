import { AuthService } from "@/api/services/auth";
import { CommonService } from "@/api/services/common";
import { setIsLoggedIn, setToken, useAppDispatch } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

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
