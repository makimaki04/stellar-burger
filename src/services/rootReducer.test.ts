import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import {
  UserOrdersSlice
} from './slices/userOrders/userOrdersSlice';
import { DataSlice } from './slices/data/dataSlice';
import { ConstructorSlice } from './slices/constructor/burgerConstructorSlice';
import { AuthSlice } from './slices/auth/authSlice';
import { OrderSlice } from './slices/order/orderSlice';

describe('Тесты rootReducer', () => {
    it('инициализация хранилища', () => {
        const store = configureStore({ reducer: rootReducer });
    
        const initialState = store.getState();
    
        const testData = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
        expect(initialState).toEqual(testData);
      });

  it('инициализация хранилища вторая версия', () => {
    const store = configureStore({ reducer: rootReducer });

    const initialState = store.getState();

    const testData = {
      [DataSlice.name]: DataSlice.getInitialState(),
      [ConstructorSlice.name]: ConstructorSlice.getInitialState(),
      [AuthSlice.name]: AuthSlice.getInitialState(),
      [OrderSlice.name]: OrderSlice.getInitialState(),
      [UserOrdersSlice.name]: UserOrdersSlice.getInitialState()
    };

    expect(initialState).toEqual(testData);
  });
});
