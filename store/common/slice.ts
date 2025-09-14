import { Balance, Transaction } from "@/models/commmon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  token: string | null;
  isLoggedIn: boolean;
  balances: Balance[];
  latestTransactions: Transaction[];
}

const initialState: CommonState = {
  token: null,
  isLoggedIn: false,
  balances: [],
  latestTransactions: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setBalances: (state, action: PayloadAction<Balance[]>) => {
      state.balances = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.latestTransactions = action.payload;
    },
  },
});

export const { setTransactions, setBalances, setIsLoggedIn, setToken } =
  commonSlice.actions;

export default commonSlice.reducer;
