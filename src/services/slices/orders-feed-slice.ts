import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { create } from 'domain';
import { act } from 'react-dom/test-utils';

type TOrdersFeedState = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  loadingError: string | null;
};

const initialState: TOrdersFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  loading: false,
  loadingError: null
};

export const getOrdersFeed = createAsyncThunk('ordersFeed/getAll', getFeedsApi);

export const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {},
  selectors: {
    ordersFeedSelector: (state) => state.orders,
    ordersFeedLoadingSelector: (state) => state.loading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersFeed.pending, (state) => {
        state.loading = true;
        state.loadingError = null;
      })
      .addCase(getOrdersFeed.rejected, (state, action) => {
        state.loading = false;
        state.loadingError = action.error.message
          ? action.error.message
          : 'Orders feed loading failed';
      })
      .addCase(getOrdersFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  ordersFeedLoadingSelector,
  ordersFeedSelector,
  totalSelector,
  totalTodaySelector
} = ordersFeedSlice.selectors;
