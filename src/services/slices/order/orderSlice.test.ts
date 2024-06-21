import {
  OrderSlice,
  TOrderSlice,
  initialState,
  makeAnOrder
} from './orderSlice';

describe('Тест отправки заказа', () => {
  const testData = ['булочка', 'ингредиент', 'соус', 'булочка'];

  it('состояние pending отправки заказа', () => {
    const currentState = OrderSlice.reducer(
      initialState,
      makeAnOrder.pending('', [])
    );

    expect(currentState.orderRequest).toBeTruthy();
    expect(currentState.error).toBeNull();
    expect(currentState.order).toBeNull();
  });

  it('состояние fulfilled отправки заказа', () => {
    const testOrderResponse = {
      success: true,
      order: {
        _id: '123',
        status: '',
        name: 'order',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: testData
      },
      name: 'order'
    };
    const currentState = OrderSlice.reducer(
      { ...initialState, orderRequest: true },
      makeAnOrder.fulfilled(testOrderResponse, '', testData)
    );

    expect(currentState.orderRequest).toBeFalsy();
    expect(currentState.order?._id).toBe('123');
    expect(currentState.order?.ingredients.length).toBe(testData.length);
  });

  it('состояние rejected отправки заказа', () => {
    const error = new Error('testError');
    const currentState = OrderSlice.reducer(
      { ...initialState, orderRequest: true },
      makeAnOrder.rejected(error, '', testData)
    );

    expect(currentState.order).toBeNull;
    expect(currentState.orderRequest).toBeFalsy();
    expect(currentState.error).toBe(error.message);
  });
});
