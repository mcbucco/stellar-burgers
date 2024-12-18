import { getOrderByNumberApi } from './../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

export const getOrderByNumber = createAsyncThunk(
  'ordersFeed/getOrder',
  getOrderByNumberApi
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  loadingError: string | null;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  loadingError: null
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  selectors: {
    orderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        (state.loading = false),
          (state.loadingError = action.error.message
            ? action.error.message
            : 'Order loading failed');
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loading = false;
      });
  }
});

export const { orderSelector } = orderSlice.selectors;
