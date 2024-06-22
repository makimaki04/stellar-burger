import { TNewOrderResponse, orderBurgerApi } from '../../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeAnOrder = createAsyncThunk(
  'make/order',
  async (data: string[]) => {
    const order = orderBurgerApi(data);
    return order;
  }
);

export type TOrderSlice = {
  orderRequest: boolean;
  order: TOrder | null;
  error: string | null;
};

export const initialState: TOrderSlice = {
  orderRequest: false,
  order: null,
  error: null
};

export const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    clearOrderState: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeAnOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(makeAnOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = String(action.error.message);
      })
      .addCase(
        makeAnOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.error = null;
          state.order = action.payload.order;
        }
      );
  },
  selectors: {
    selectOrders: (state) => state.order,
    selectRequest: (state) => state.orderRequest
  }
});

export const { selectOrders, selectRequest } = OrderSlice.selectors;
export const { clearOrderState } = OrderSlice.actions;
