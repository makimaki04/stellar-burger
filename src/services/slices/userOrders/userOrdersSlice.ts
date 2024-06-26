import { TFeedsResponse, getOrdersApi } from '../../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk('get/order', async () => {
  const orders = getOrdersApi();
  return orders;
});

export type TUserOrdersSlice = {
  orders: TOrder[];
  error: string | null;
};

export const initialState: TUserOrdersSlice = {
  orders: [],
  error: null
};

export const UserOrdersSlice = createSlice({
  name: 'userOrders/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.rejected, (state, action) => {
        state.error = String(action.error.message);
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.error = null;
          state.orders = [...action.payload];
        }
      );
  },
  selectors: {
    selectOrders: (state) => state.orders
  }
});

export const { selectOrders } = UserOrdersSlice.selectors;
