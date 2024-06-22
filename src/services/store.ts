import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { DataSlice } from './slices/data/dataSlice';
import { ConstructorSlice } from './slices/constructor/burgerConstructorSlice';
import { AuthSlice } from './slices/auth/authSlice';
import { OrderSlice } from './slices/order/orderSlice';
import { UserOrdersSlice } from './slices/userOrders/userOrdersSlice';

export const rootReducer = combineReducers({
  [DataSlice.name]: DataSlice.reducer,
  [ConstructorSlice.name]: ConstructorSlice.reducer,
  [AuthSlice.name]: AuthSlice.reducer,
  [OrderSlice.name]: OrderSlice.reducer,
  [UserOrdersSlice.name]: UserOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
