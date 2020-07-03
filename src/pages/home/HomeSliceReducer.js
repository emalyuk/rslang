import { createSlice } from '@reduxjs/toolkit';

const initialHomeState = {
  data: [],
  errors: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: { ...initialHomeState },
  reducers: {
    getDataSuccess(state, action) {
      state.data = action.payload;
    },
    getDataFailure(state, action) {
      state.error = action.payload;
    },
    resetHomeState(state) {
      state = initialHomeState;
    },
  },
});

export const {
  getDataSuccess,
  getDataFailure,
  resetHomeState,
} = homeSlice.actions;

export const homeSliceReducer = homeSlice.reducer;

export const getHomeInfo = () => async (dispatch) => {
  try {
    // const { data } = await getHomeData();
    const data = [1, 2, 3]; // emulate success response

    if (data) {
      dispatch(getDataSuccess(data));
    } else {
      dispatch(getDataFailure(data));
    }
  } catch (err) {
    console.log('Home something went wrong');
  }
};
