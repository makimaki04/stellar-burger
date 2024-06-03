import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAction
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'reg/user',
  async (data: TRegisterData) => {
    const userDaata = registerUserApi(data);
    return userDaata;
  }
);

export const loginUser = createAsyncThunk(
  'login/user',
  async (data: TLoginData) => {
    const userData = loginUserApi(data);
    return userData;
  }
);

export const getUser = createAsyncThunk('get/user', async () => {
  const userData = getUserApi();
  return userData;
});

export const logoutUser = createAsyncThunk('logout/user', async () => {
  logoutApi();
});

export const updateUserData = createAsyncThunk(
  'update/user',
  async (data: TRegisterData) => {
    const userData = updateUserApi(data);
    return userData;
  }
);

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  request: boolean;
  error: unknown;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  request: false,
  error: null
};

export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.request = false;
          state.error = null;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.request = false;
          state.error = null;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      )
      .addCase(logoutUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, actioon) => {
        state.request = false;
        state.error = actioon.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => (state = initialState))
      .addCase(getUser.pending, (state) => {
        state.request = true;
        state.error = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.request = false;
          state.error = null;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      )
      .addCase(updateUserData.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload;
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.request = false;
          state.error = null;
          state.user = action.payload.user;
        }
      );
  },
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user,
    selectIsRequest: (state) => state.request
  }
});

export const { selectIsAuthChecked, selectUser, selectIsRequest } =
  AuthSlice.selectors;
