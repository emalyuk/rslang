import { createSlice } from '@reduxjs/toolkit';

import { getWordsData, createUserWord } from './CardsApi';

const initialCardsState = {
  data: [],
  todayStats: {
    date: null,
    todayWordLearned: 0,
    bestSeries: 0,
    countRightAnswers: 0,
    countWrongAnswers: 0,
    countSkipedWords: 0,
  },
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
    setTodayStats(state, action) {
      state.todayStats = action.payload;
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
  dispatch(setIsAnswerReceived(false));
  dispatch(setIsCorrectAnswer(false));
  dispatch(setIsSkipAnswer(false));
  createUserWord(id, userWord);
  dispatch(showNextCard());
};

export const getWords = (learnedWords, group, wordsPerDay) => async (
  dispatch,
) => {
  try {
    const { data } = await getWordsData(learnedWords, group, wordsPerDay);

    if (data) {
      dispatch(
        getDataSuccess([
          ...data.slice(learnedWords, learnedWords + wordsPerDay),
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
