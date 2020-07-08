import { createSlice } from '@reduxjs/toolkit';

import { getWordsData, createUserWord } from './CardsApi';

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
    setIsAnswerReceived(state, action) {
      state.currentCardAction.isAnswerReceived = action.payload;
    },
    setIsCorrectAnswer(state, action) {
      state.currentCardAction.isCorrectAnswer = action.payload;
    },
    showNextCard(state) {
      state.data = [...state.data.slice(1)];
    },
  },
});

export const {
  getDataSuccess,
  getDataFailure,
  resetHomeState,
  setIsAnswerReceived,
  setIsCorrectAnswer,
  showNextCard,
} = cardsSlice.actions;

export const cardsSliceReducer = cardsSlice.reducer;

export const getNextWord = () => (dispatch) => {
  dispatch(setIsAnswerReceived(false));
  dispatch(setIsCorrectAnswer(false));
  dispatch(showNextCard());
};

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
