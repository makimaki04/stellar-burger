import { getFeedsApi, getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TIngredientList, TOrdersData } from '@utils-types';
import { RootState } from '../store';

export const getIngredients = createAsyncThunk('get/ingredients', async () =>
  getIngredientsApi()
);

export const getOrders = createAsyncThunk('get/orders', async () =>
  getFeedsApi()
);

type TDataState = {
  ingredients: TIngredientList;
  orders: TOrdersData;
  isLoading: boolean;
  success: boolean | null;
};

const initialState: TDataState = {
  ingredients: {
    bun: [],
    sauce: [],
    main: []
  },
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  success: null
};

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.success = true;
          action.payload.forEach((ingredient) => {
            if (ingredient.type === 'bun') {
              state.ingredients.bun.push(ingredient);
            } else if (ingredient.type === 'sauce') {
              state.ingredients.sauce.push(ingredient);
            } else {
              state.ingredients.main.push(ingredient);
            }
          });
        }
      )
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.success = true;
          state.orders.orders = action.payload.orders;
          state.orders.total = action.payload.total;
          state.orders.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const setIngredients = DataSlice.actions;
export const selectIngredients = (state: RootState) =>
  state.dataSlice.ingredients;
export const selectIsLoading = (state: RootState) => state.dataSlice.isLoading;
export const selectSuccess = (state: RootState) => state.dataSlice.success;
export const selectOrders = (state: RootState) => state.dataSlice.orders;
