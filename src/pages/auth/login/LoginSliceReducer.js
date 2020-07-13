import { createSlice } from '@reduxjs/toolkit';

import { signInUser } from './LoginApi';
import { userLoginDataKey } from '../../../constants/constants';

const initialLoginState = {
  data: [],
  error: [],
  isLoading: false,
  isUserLoggedIn: Boolean(global.localStorage.getItem(userLoginDataKey)),
};

const loginSlice = createSlice({
  name: 'login',
  initialState: { ...initialLoginState },
  reducers: {
    loginDataRequest(state) {
      state.isLoading = true;
    },
    getLoginDataSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
      state.isUserLoggedIn = true;
    },
    getLoginDataFailure(state, action) {
      state.error = [action.payload.response.data];
      state.isLoading = false;
    },
    resetLoginState(state) {
      state = initialLoginState;
    },
  },
});

export const {
  getLoginDataSuccess,
  getLoginDataFailure,
  resetLoginState,
  loginDataRequest,
} = loginSlice.actions;

export const loginSliceReducer = loginSlice.reducer;

export const getLoginInfo = (data) => async (dispatch) => {
  try {
    dispatch(loginDataRequest());

    const response = await signInUser(data);
    const signInUserData = JSON.stringify(response.data);
    global.localStorage.setItem(userLoginDataKey, signInUserData);

    dispatch(getLoginDataSuccess(response.data));
  } catch (err) {
    dispatch(getLoginDataFailure(err));
    console.log(err.response.data);
  }
};
