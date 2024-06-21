import {
  TUserOrdersSlice,
  UserOrdersSlice,
  getOrders
} from './userOrdersSlice';

describe('Тест получения заказов полтзователя', () => {
  const initialState: TUserOrdersSlice = {
    orders: [],
    error: null
  };

  const testData = [
    {
      _id: '1',
      status: '',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    },
    {
      _id: '2',
      status: '',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    },
    {
      _id: '3',
      status: '',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    }
  ];

  it('состояние fulfilled получения заказа пользователя', () => {
    const currentState = UserOrdersSlice.reducer(
      initialState,
      getOrders.fulfilled(testData, '')
    );

    expect(currentState.error).toBeNull();
    expect(currentState.orders.length).toBe(testData.length);
    expect(currentState.orders[0]).toEqual(testData[0]);
  });

  it('состояни rejected получения заказа пользователя', () => {
    const error = new Error('testError');
    const currentState = UserOrdersSlice.reducer(
        initialState, 
        getOrders.rejected(error, '')
    );

    expect(currentState.error).toBe(error.message);
    expect(currentState.orders.length).toBe(0);
  });
});

