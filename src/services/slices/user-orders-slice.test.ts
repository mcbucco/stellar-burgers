import { mockOrdersFeed } from '../../utils/mockData';
import { getUserOrders, userOrdersSlice } from './user-orders-slice';
import { getUser } from './user-slice';

const expectedResult = {
  success: true,
  orders: [...mockOrdersFeed],
  total: 100,
  totalToday: 30
};

describe("User's Orders Slice Test", () => {
  test('Loading indication', () => {
    const state = userOrdersSlice.reducer(undefined, { type: '@@INIT' });
    expect(state.loading).toBe(false);

    const newState = userOrdersSlice.reducer(state, {
      type: getUserOrders.pending.type,
      payload: null
    });
    expect(newState.loading).toBe(true);
  });

  test("Getting user's orders", () => {
    const state = userOrdersSlice.reducer(undefined, { type: '@@INIT' });
    expect(state.orders).toEqual([]);

    const newState = userOrdersSlice.reducer(state, {
      type: getUserOrders.fulfilled.type,
      payload: expectedResult.orders
    });
    expect(newState.orders).toEqual(expectedResult.orders);
  });

  test('Error catch', () => {
    const errorMessage = 'Test Error';
    const state = userOrdersSlice.reducer(undefined, { type: '@@INIT' });
    expect(state.loadingError).toBe(null);

    const newState = userOrdersSlice.reducer(state, {
      type: getUserOrders.rejected.type,
      error: new Error(errorMessage)
    });
    expect(newState.loadingError).toBe(errorMessage);
  });
});
