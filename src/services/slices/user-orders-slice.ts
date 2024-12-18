import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { factory } from 'typescript';

export const getUserOrders = createAsyncThunk(
  'user/getOrders/All',
  getOrdersApi
);

type TOrdersFeedState = {
  orders: TOrder[];
  loading: boolean;
  loadingError: string | null;
};

const initialState: TOrdersFeedState = {
  orders: [],
  loading: false,
  loadingError: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    userOrdersSelector: (state) => state.orders,
    loadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state, action) => {
        state.loading = true;
        state.loadingError = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.loadingError = action.error?.message
          ? action.error?.message
          : 'User orders loading failed';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const { userOrdersSelector, loadingSelector } =
  userOrdersSlice.selectors;
