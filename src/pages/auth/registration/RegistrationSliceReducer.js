import { createSlice } from '@reduxjs/toolkit';

import createUser from './RegistrationApi';

const initialRegistrationState = {
  data: [],
  error: null,
  isLoading: false,
};

const RegistrationSlice = createSlice({
  name: 'Registration',
  initialState: { ...initialRegistrationState },
  reducers: {
    getRegistrationDataRequest(state) {
      state.isLoading = true;
    },
    getRegistrationDataSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    getRegistrationDataFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetRegistrationState(state) {
      state = initialRegistrationState;
    },
  },
});

export const {
  getRegistrationDataSuccess,
  getRegistrationDataFailure,
  resetRegistrationState,
  getRegistrationDataRequest,
} = RegistrationSlice.actions;

export const RegistrationSliceReducer = RegistrationSlice.reducer;

export const getRegistrationInfo = (data) => async (dispatch) => {
  try {
    dispatch(getRegistrationDataRequest());
    const response = await createUser(data);

    console.log(response);

    dispatch(getRegistrationDataSuccess(response));
  } catch (err) {
    dispatch(getRegistrationDataFailure(err));
  }
};
