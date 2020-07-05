import { createSlice } from '@reduxjs/toolkit';

import { getWordsData } from './CardsApi';

const initialCardsState = {
  data: [],
  deletedWordsData: [],
  isLoading: true,
  errors: null,
  currentCardAction: {
    isAnswerReceived: false,
    isCorrectAnswer: false,
  },
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
    // resetHomeState(state) {
    //   state = initialHomeState;
    // },
    setIsAnswerReceived(state, action) {
      state.currentCardAction.isAnswerReceived = action.payload;
    },
    setIsCorrectAnswer(state, action) {
      state.currentCardAction.isCorrectAnswer = action.payload;
    },
  },
});

export const {
  getDataSuccess,
  getDataFailure,
  resetHomeState,
  setIsAnswerReceived,
  setIsCorrectAnswer,
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
