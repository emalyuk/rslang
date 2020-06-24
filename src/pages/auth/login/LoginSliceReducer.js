import { createSlice } from '@reduxjs/toolkit';

import signInUser from './LoginApi';

const initialLoginState = {
  data: [],
  error: null,
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: { ...initialLoginState },
  reducers: {
    getLoginDataRequest(state) {
      state.isLoading = true;
    },
    getLoginDataSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    getLoginDataFailure(state, action) {
      state.error = action.payload;
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
  getLoginDataRequest,
} = loginSlice.actions;

export const loginSliceReducer = loginSlice.reducer;

export const getLoginInfo = (data) => async (dispatch) => {
  try {
    dispatch(getLoginDataRequest());
    const response = await signInUser(data);

    //TODO: закинкть токен в локал сторадж + редирект на хоме скрин
    console.log(response);

    dispatch(getLoginDataSuccess(response.data));
  } catch (err) {
    dispatch(getLoginDataFailure(err));
  }
};
