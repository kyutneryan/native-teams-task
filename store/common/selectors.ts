import { RootState } from "../main";

export const getToken = (state: RootState) => state.common.token;
export const getIsLoggedIn = (state: RootState) => state.common.isLoggedIn;
export const getBalances = (state: RootState) => state.common.balances;
export const getTransactions = (state: RootState) =>
  state.common.latestTransactions;
