import { combineReducers } from "@reduxjs/toolkit";
import CommonReducer from "./common/slice";

const rootReducer = combineReducers({
  common: CommonReducer,
});

export default rootReducer;
