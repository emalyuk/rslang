import { createSlice } from '@reduxjs/toolkit';

import { getWordsData } from './CardsApi';

const initialCardsState = {
  data: [],
  isLoading: true,
  errors: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: { ...initialCardsState },
  reducers: {
    getDataSuccess(state, action) {
      state.data = action.payload;
    },
    getDataFailure(state, action) {
      state.error = action.payload;
    },
    resetHomeState(state) {
      // state = initialHomeState;
    },
  },
});

export const {
  getDataSuccess,
  getDataFailure,
  resetHomeState,
} = cardsSlice.actions;

export const cardsSliceReducer = cardsSlice.reducer;

export const getWords = (page, group) => async (dispatch) => {
  try {
    const { data } = await getWordsData(page, group);

    if (data) {
      dispatch(getDataSuccess(data));
    } else {
      console.log('GET WORDS DATA FAILURE');
      dispatch(getDataFailure(data));
    }
  } catch (err) {
    console.log('Cards something went wrong');
  }
};
