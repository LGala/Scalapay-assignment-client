import { purchase } from "./purchase/create";
import { createOrderCall } from "./orders/create";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ purchase, createOrderCall });
