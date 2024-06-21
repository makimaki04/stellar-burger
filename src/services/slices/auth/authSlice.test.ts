
import { AuthSlice, TAuthState, getUser, loginUser, logoutUser, registerUser, updateUserData } from './authSlice';

describe('Тестирование механизма авторизации пользователя', () => {
  const initialState: TAuthState = {
    user: null,
    isAuthChecked: false,
    isAuthenticated: false,
    request: false,
    error: null
  };

  const testRegData = {
    email: 'testEmail@yandex.ru',
    password: '12345',
    name: 'name'
  };

  it('состояние pending регистрации пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      registerUser.pending('', testRegData)
    );

    expect(currentState.request).toBeTruthy();
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfilled регистрации пользователя', () => {
    const testData = {
      success: true,
      user: testRegData,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      registerUser.fulfilled(testData, '', testRegData)
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.isAuthenticated).toBeTruthy();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected регистрации пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      registerUser.rejected(error, '', testRegData)
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });

  const testLoginData = {
    email: 'testEmail@yandex.ru',
    password: '12345',
  };

  it('состояние pending авторизации пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      loginUser.pending('', testLoginData)
    );

    expect(currentState.request).toBeTruthy();
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfilled авторизации пользователя', () => {
    const testData = {
      success: true,
      user: {...testLoginData, name: 'name'},
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      loginUser.fulfilled(testData, '', testLoginData)
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.isAuthenticated).toBeTruthy();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected авторизации пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      loginUser.rejected(error, '', testLoginData)
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });

  it('состояние pending выхода пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      logoutUser.pending('')
    );

    expect(currentState.request).toBeTruthy();
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfi lled выхода пользователя', () => {
    
    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      logoutUser.fulfilled(undefined, '')
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeFalsy();
    expect(currentState.isAuthenticated).toBeFalsy();
    expect(currentState.user).toBeNull
  });

  it('состояние rejected выхода пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true, user: testRegData },
      logoutUser.rejected(error, '')
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.user).toBeTruthy();
    expect(currentState.error).toBe(error.message);
  });

  it('состояние pending получения данных пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      getUser.pending('')
    );

    expect(currentState.request).toBeTruthy();
    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeFalsy();
    expect(currentState.isAuthenticated).toBeFalsy();
  });

  it('состояние fulfilled получения данных пользователя', () => {
    const testData = {
      success: true,
      user: {...testLoginData, name: 'name'},
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      getUser.fulfilled(testData, '')
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.isAuthenticated).toBeTruthy();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected получения данных пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      getUser.rejected(error, '')
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });

  it('состояние pending обновления данных пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      updateUserData.pending('', testRegData)
    );

    expect(currentState.request).toBeTruthy();
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfilled обновления данных пользователя', () => {
    const testData = {
      success: true,
      user: testRegData,
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      updateUserData.fulfilled(testData, '', testRegData)
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.error).toBeNull();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected обновления данных пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, request: true },
      updateUserData.rejected(error, '', testRegData)
    );

    expect(currentState.request).toBeFalsy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });
});
