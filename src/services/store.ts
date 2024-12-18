import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/burger-ingredients-slice';
import { newOrderSlice } from './slices/new-order-slice';
import { userSlice } from './slices/user-slice';
import { ordersFeedSlice } from './slices/orders-feed-slice';
import { userOrdersSlice } from './slices/user-orders-slice';
import { orderSlice } from './slices/order-slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  ordersFeedSlice,
  newOrderSlice,
  orderSlice,
  userSlice,
  userOrdersSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
