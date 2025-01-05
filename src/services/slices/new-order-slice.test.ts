import { nanoid } from '@reduxjs/toolkit';
import { mockIngredients } from '../../utils/mockData';
import {
  addConstructorItem,
  deleteConstructorItem,
  moveDown,
  moveUp,
  newOrderSlice
} from './new-order-slice';

describe('New Order (Constructor) Slice Test', () => {
  describe('Adding / Deleting Ingredients', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('Adding ingredient', () => {
      const stateWithBun = newOrderSlice.reducer(
        initialState,
        addConstructorItem(mockIngredients[0])
      );
      const { bun } = stateWithBun.constructorItems;
      expect(bun).toMatchObject(mockIngredients[0]);

      const stateWithFilling = newOrderSlice.reducer(
        initialState,
        addConstructorItem(mockIngredients[1])
      );
      const { ingredients } = stateWithFilling.constructorItems;
      expect(ingredients).toMatchObject([mockIngredients[1]]);
    });

    test('Deleting ingredient', () => {
      const state = newOrderSlice.reducer(
        initialState,
        addConstructorItem(mockIngredients[1])
      );
      const { ingredients } = state.constructorItems;
      const newState = newOrderSlice.reducer(
        state,
        deleteConstructorItem(ingredients[0])
      );
      expect(newState.constructorItems.ingredients).toEqual([]);
    });
  });

  test('Moving Ingredients', () => {
    const testIngredients = [
      { ...mockIngredients[1], id: nanoid() },
      { ...mockIngredients[2], id: nanoid() }
    ];

    const initialState = {
      constructorItems: {
        bun: { ...mockIngredients[0], id: nanoid() },
        ingredients: testIngredients
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const newState = newOrderSlice.reducer(initialState, moveDown(0));
    expect(newState.constructorItems.ingredients).toStrictEqual([
      testIngredients[1],
      testIngredients[0]
    ]);
  });
});
