import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie } from '../../utils/cookie';
import { eraseTokens, setTokens } from '../../utils/utils';
import { electron } from 'webpack';

export const getUser = createAsyncThunk('user/get', getUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch(authChecked());
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const regData = await registerUserApi(data);
    setTokens(regData.accessToken, regData.refreshToken);
    return regData.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const loginData = await loginUserApi(data);
    setTokens(loginData.accessToken, loginData.refreshToken);
    return loginData.user;
  }
);

export const logOutUser = createAsyncThunk('user/logOut', async () => {
  const response = await logoutApi();
  if (response.success) {
    eraseTokens();
  }
});

export const updateUserData = createAsyncThunk(
  'user/updateData',
  updateUserApi
);

type TUserState = {
  isAuthed: boolean;
  isAuthChecked: boolean;
  user: TUser;
  loginError: string | null;
  loginRequest: boolean;
};

const initialState: TUserState = {
  isAuthed: false,
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
  loginError: null,
  loginRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthed = false;
        state.loginRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error?.message);
        state.loginRequest = false;
        state.isAuthed = false;
        state.loginError = action.error.message
          ? action.error.message
          : 'User registration failed';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthed = true;
        state.loginRequest = false;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginRequest = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.error?.message);
        state.loginRequest = false;
        state.loginError = action.error.message
          ? action.error.message
          : 'User log-in failed';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.isAuthed = true;
        state.user = action.payload;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loginError = action.error.message
          ? action.error.message
          : 'User log-out failed';
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isAuthed = false;
        state.user = {
          name: '',
          email: ''
        };
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) =>
        console.log(action.error.message)
      )
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        console.log(action.error.message);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuthed = true;
      });
  },
  selectors: {
    userSelector: (state) => state.user,
    loginErrorSelector: (state) => state.loginError,
    isAuthedSelector: (state) => state.isAuthed,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    loginUserSelector: (state) => state.loginRequest
  }
});

export const { authChecked } = userSlice.actions;
export const {
  userSelector,
  isAuthedSelector,
  isAuthCheckedSelector,
  loginErrorSelector,
  loginUserSelector
} = userSlice.selectors;
