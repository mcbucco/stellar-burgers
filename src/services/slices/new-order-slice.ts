import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { moveElement } from '../../utils/utils';

type TOrderState = {
  constructorItems: {
    bun: null | TConstructorIngredient;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: null | TOrder;
  error: null | string;
};

const initialState: TOrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async (data: string[]) => orderBurgerApi(data)
);

export const newOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const constructorItem = { ...ingredient, id: nanoid() };
        return { payload: { ...constructorItem } };
      }
    },
    deleteConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const updatedIngredients = state.constructorItems.ingredients.filter(
        (ingr) => ingr.id !== action.payload.id
      );
      state.constructorItems.ingredients = updatedIngredients;
    },
    moveUp: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients = moveElement<TConstructorIngredient>(
        state.constructorItems.ingredients,
        action.payload,
        'forward'
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients = moveElement<TConstructorIngredient>(
        state.constructorItems.ingredients,
        action.payload,
        'backward'
      );
    },
    resetConstructor: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getConstructorItemsSelector: (state) => state.constructorItems,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        console.log(action.error.message);
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const {
  addConstructorItem,
  deleteConstructorItem,
  moveUp,
  moveDown,
  resetConstructor
} = newOrderSlice.actions;
export const {
  getConstructorItemsSelector,
  getOrderRequestSelector,
  getOrderModalDataSelector
} = newOrderSlice.selectors;
