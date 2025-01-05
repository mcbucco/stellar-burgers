import { configureStore } from '@reduxjs/toolkit';
import { mockOrderData } from '../../utils/mockData';
import { getOrderByNumber, orderSlice } from './order-slice';

const expectedResult = {
  success: true,
  orders: [mockOrderData]
};

describe('Order Slice Tests', () => {
  describe('Tests without errors', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;
    });

    test('Loading indication', async () => {
      const store = configureStore({
        reducer: orderSlice.reducer
      });

      expect(store.getState().loading).toBe(false);
      store.dispatch(getOrderByNumber(64608));
      expect(store.getState().loading).toBe(true);

      await store.dispatch(getOrderByNumber(64608));
      expect(store.getState().loading).toBe(false);
    });

    test('Getting order data', async () => {
      const store = configureStore({
        reducer: orderSlice.reducer
      });

      expect(store.getState().order).toStrictEqual(null);
      await store.dispatch(getOrderByNumber(64608));
      expect(store.getState().order).toEqual(expectedResult.orders[0]);
    });
  });

  describe('Test with error', () => {
    const errorMessage = 'Test Error';
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(errorMessage))
      ) as jest.Mock;
    });

    test('Error catch', async () => {
      const store = configureStore({
        reducer: orderSlice.reducer
      });

      expect(store.getState().loadingError).toBe(null);
      await store.dispatch(getOrderByNumber(64608));
      expect(store.getState().loadingError).toBe(errorMessage);
    });
  });
});
