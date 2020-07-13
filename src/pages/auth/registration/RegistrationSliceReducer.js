import { createSlice } from '@reduxjs/toolkit';

import createUser from './RegistrationApi';

const initialRegistrationState = {
  data: [],
  error: [],
  isLoading: false,
};

const RegistrationSlice = createSlice({
  name: 'registration',
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

export const registrationSliceReducer = RegistrationSlice.reducer;

export const getRegistrationInfo = (data) => async (dispatch) => {
  try {
    dispatch(getRegistrationDataRequest());
    const response = await createUser(data);

    dispatch(getRegistrationDataSuccess(response));
  } catch (err) {
    dispatch(getRegistrationDataFailure(err));
  }
};
