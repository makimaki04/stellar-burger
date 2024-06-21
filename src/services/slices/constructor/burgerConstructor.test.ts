import {
  ConstructorSlice,
  TConstructorState,
  addToConstructor,
  clearConstructorState,
  rebuildOrder,
  removeFromConstructor
} from './burgerConstructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'testID')
}));

describe('Тест конструктора бургеров', () => {
  const initialState: TConstructorState = {
    bun: null,
    ingredients: []
  };

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

  it('Добавление булочки в конструктор', () => {
    const currentState = ConstructorSlice.reducer(
      initialState,
      addToConstructor(testData[0])
    );

    expect(currentState.bun).toEqual({
      ...testData[0],
      id: 'testID'
    });
    expect(currentState.ingredients.length).toBe(0);
  });

  it('Добавление ингредиента в конструктор', () => {
    const currentState = ConstructorSlice.reducer(
      initialState,
      addToConstructor(testData[1])
    );

    expect(currentState.ingredients.length).toBe(1);
    expect(currentState.ingredients[0]).toEqual({
      ...testData[1],
      id: 'testID'
    });
  });

  it('Удаление ингредиента из конструктора', () => {
    const testState = {
      ...initialState,
      ingredients: [
        { ...testData[1], id: 'ID' },
        { ...testData[2], id: 'anotherID' }
      ]
    };

    const currentState = ConstructorSlice.reducer(
      testState,
      removeFromConstructor(testState.ingredients[1])
    );

    expect(currentState.ingredients.length).toBe(1);
    expect(currentState.ingredients[0]).toEqual({
      ...testData[1],
      id: 'ID'
    });
  });

  const testState = {
    bun: {...testData[0], id: '1'},
    ingredients: [{...testData[1], id: '2'}, {...testData[2], id: '3'}]
};

  it('Изменение порядка ингредиентов в конструкторе', () => {
    const currentState = ConstructorSlice.reducer(
        testState,
        rebuildOrder({from: 1, to: 0})
    );

    expect(currentState.ingredients[0].id).toBe('3');
    expect(currentState.ingredients[1].id).toBe('2')
  });

  it('Очистка конструктора', () => {
    const currentState = ConstructorSlice.reducer(
        testState,
        clearConstructorState()
    );

    expect(currentState).toEqual(initialState);
  });
});
