import { createSlice } from '@reduxjs/toolkit';

import { getWordsData, createUserWord } from './CardsApi';

const initialCardsState = {
  data: [],
  currentCardAction: {
    isAnswerReceived: false,
    isCorrectAnswer: false,
    isSkippedWord: false,
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
    resetData(state) {
      state.data = [];
    },
    setIsAnswerReceived(state, action) {
      state.currentCardAction.isAnswerReceived = action.payload;
    },
    setIsCorrectAnswer(state, action) {
      state.currentCardAction.isCorrectAnswer = action.payload;
    },
    setIsSkipAnswer(state, action) {
      state.currentCardAction.isSkippedWord = action.payload;
    },
    showNextCard(state) {
      state.data = [...state.data.slice(1)];
    },
  },
});

export const {
  getDataSuccess,
  getDataFailure,
  resetData,
  resetHomeState,
  setIsAnswerReceived,
  setIsCorrectAnswer,
  showNextCard,
  setIsSkipAnswer,
  setTodayStats,
} = cardsSlice.actions;

export const cardsSliceReducer = cardsSlice.reducer;

export const getNextWord = (id, userWord) => (dispatch) => {
  createUserWord(id, userWord);
  dispatch(setIsAnswerReceived(false));
  dispatch(setIsCorrectAnswer(false));
  dispatch(setIsSkipAnswer(false));
  dispatch(showNextCard());
};

export const getWords = (numberStartCard, group, wordsPerDay) => async (
  dispatch,
) => {
  try {
    const { data } = await getWordsData(group);

    console.log(data)

    if (data) {
      dispatch(
        getDataSuccess([
          ...data.slice(numberStartCard, numberStartCard + wordsPerDay),
        ]),
      );
    } else {
      console.log('GET WORDS DATA FAILURE');
      dispatch(getDataFailure(data));
    }
  } catch (err) {
    console.log('Cards something went wrong');
  }
};
