import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  data: [],
  errors: null,
};

const loginSlice = createSlice({
  name: "home",
  initialState: { ...initialLoginState },
  reducers: {
    getLoginDataSuccess(state, action) {
      state.data = action.payload;
    },
    getLoginDataFailure(state, action) {
      state.error = action.payload;
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
} = loginSlice.actions;

export const loginSliceReducer = loginSlice.reducer;

export const getLoginInfo = () => async (dispatch) => {
  try {
    const data = ["login", "data"]; // emulate success response

    if (data) {
      dispatch(getLoginDataSuccess(data));
    } else {
      dispatch(getLoginDataFailure(data));
    }
  } catch (err) {
    console.log("Home something went wrong");
  }
};
