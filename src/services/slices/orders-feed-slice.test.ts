import { configureStore } from '@reduxjs/toolkit';
import { mockOrdersFeed } from '../../utils/mockData';
import { getOrdersFeed, ordersFeedSlice } from './orders-feed-slice';

const expectedResult = {
  success: true,
  orders: [...mockOrdersFeed],
  total: 100,
  totalToday: 30
};

describe('Orders Feed Slice Tests', () => {
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
        reducer: ordersFeedSlice.reducer
      });

      expect(store.getState().loading).toBe(false);
      store.dispatch(getOrdersFeed());
      expect(store.getState().loading).toBe(true);

      await store.dispatch(getOrdersFeed());
      expect(store.getState().loading).toBe(false);
    });

    test('Getting orders feed data', async () => {
      const store = configureStore({
        reducer: ordersFeedSlice.reducer
      });

      expect(store.getState().orders).toStrictEqual([]);
      await store.dispatch(getOrdersFeed());
      expect(store.getState().orders).toEqual(expectedResult.orders);
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
        reducer: ordersFeedSlice.reducer
      });

      expect(store.getState().loadingError).toBe(null);
      await store.dispatch(getOrdersFeed());
      expect(store.getState().loadingError).toBe(errorMessage);
    });
  });
});
