import { configureStore } from '@reduxjs/toolkit';
import { getIngredients, ingredientsSlice } from './burger-ingredients-slice';
import { exec } from 'child_process';
import { mockIngredients } from '../../utils/mockData';

const expectedResult = {
  success: true,
  data: [...mockIngredients]
};

describe('Ingredients Slice Tests:', () => {
  describe('Tests with no error', () => {
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
        reducer: ingredientsSlice.reducer
      });

      expect(store.getState().loading).toBe(false);
      store.dispatch(getIngredients());
      expect(store.getState().loading).toBe(true);

      await store.dispatch(getIngredients());
      expect(store.getState().loading).toBe(false);
    });

    test('Getting ingredients', async () => {
      const store = configureStore({
        reducer: ingredientsSlice.reducer
      });

      expect(store.getState().ingredients).toStrictEqual([]);
      await store.dispatch(getIngredients());
      expect(store.getState().ingredients).toEqual(expectedResult.data);
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
        reducer: ingredientsSlice.reducer
      });

      expect(store.getState().error).toBe(null);
      await store.dispatch(getIngredients());
      expect(store.getState().error).toBe(errorMessage);
    });
  });
});
