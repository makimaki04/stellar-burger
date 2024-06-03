import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { DataSlice } from './slices/dataSlice';
import { ConstructorSlice } from './slices/burgerConstructorSlice';
import { AuthSlice } from './slices/authSlice';
import { OrderSlice } from './slices/orderSlice';
import { UserOrdersSlice } from './slices/userOrdersSlice';

const store = configureStore({
  reducer: {
    [DataSlice.name]: DataSlice.reducer,
    [ConstructorSlice.name]: ConstructorSlice.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
    [OrderSlice.name]: OrderSlice.reducer,
    [UserOrdersSlice.name]: UserOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
