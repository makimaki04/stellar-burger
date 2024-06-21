import { DataSlice, TDataState, getIngredients, getOrders } from './dataSlice';

describe('Тест слайса получения данных', () => {
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
    errors: null
  };

  it('состояние pending получения списка ингредиентов', () => {
    const currentState = DataSlice.reducer(
      initialState,
      getIngredients.pending('')
    );

    expect(currentState.errors).toBeNull();
    expect(currentState.isLoading).toBe(true);
  });

  it('состояние fulfilled получения списка ингредиентов', () => {
    const testData = [
      {
        _id: '1',
        name: 'Ингредиент 1',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'src',
        image_mobile: 'src',
        image_large: 'src'
      },
      {
        _id: '2',
        name: 'Ингредиент 2',
        type: 'sauce',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'src',
        image_mobile: 'src',
        image_large: 'src'
      },
      {
        _id: '3',
        name: 'Ингредиент 3',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'src',
        image_mobile: 'src',
        image_large: 'src'
      }
    ];

    const currentState = DataSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.fulfilled(testData, '')
    );

    expect(currentState).toEqual({
      ingredients: {
        bun: [testData[0]],
        sauce: [testData[1]],
        main: [testData[2]]
      },
      orders: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      isLoading: false,
      errors: null
    });
  });

  it('состояние rejected получения списка ингредиентов', () => {
    const testError = new Error('Test error');
    const currentState = DataSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.rejected(testError, '')
    );;

    expect(currentState.isLoading).toBe(false);
    expect(currentState.errors).toBe(testError.message);
  });

  it('состояние pending получения списка заказов', () => {
    const currentState = DataSlice.reducer(
      initialState,
      getOrders.pending('')
    );

    expect(currentState.errors).toBeNull();
    expect(currentState.isLoading).toBeTruthy();
  });

  it('состояние fulfilled получения списка заказов', () => {
    const testData = {
      orders: [{
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
}],
      total: 100,
      totalToday: 10,
      success: true
    };

    const currentState = DataSlice.reducer(
      {...initialState, isLoading: true},
      getOrders.fulfilled(testData, '')
    );

    expect(currentState.isLoading).toBeFalsy();
    expect(currentState.orders.orders.length).toBe(testData.orders.length);
    expect(currentState.orders.orders[0]).toEqual(testData.orders[0]);
  });

  it('состояние reject получения списка заказов', () => {
    const error = new Error('testError');
    const currentState = DataSlice.reducer(
      {...initialState, isLoading: true},
      getOrders.rejected(error, '')
    );

    expect(currentState.isLoading).toBeFalsy();
    expect(currentState.errors).toBe(error.message);
    expect(currentState.orders.orders.length).toBe(0);
  });
});
