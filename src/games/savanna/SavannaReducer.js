import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { get } from 'http';

const initialSavannaState = {
  words: [],
  showModal: null,
  wordNumber: 0,
  showStart: null,
  showCloseModal: null,
  showResultsModal: null,
  playSound: null,
  showDeleteModal: null,
  isRefresh: null,
};

const savannaSlice = createSlice({
  name: 'game-savanna',
  initialState: { ...initialSavannaState },
  reducers: {
    getShowDeleteModal(state, action) {
      state.showDeleteModal = action.payload;
    },
    getWords(state, action) {
      state.words = action.payload;
    },
    toggleShowModal(state, action) {
      state.showModal = action.payload;
    },
    getWordNumber(state, action) {
      state.wordNumber = action.payload;
    },
    getPlaySound(state, action) {
      state.playSound = action.payload;
    },
    getShowStart(state, action) {
      state.showStart = action.payload;
    },
    getShowResultsModal(state, action) {
      state.showResultsModal = action.payload;
    },
    getShowCloseModal(state, action) {
      state.showCloseModal = action.payload;
    },
    getIsRefresh(state, action) {
      state.isRefresh = action.payload;
    },
  },
});

export const {
  getWords,
  toggleShowModal,
  getWordNumber,
  getPlaySound,
  getShowStart,
  getShowCloseModal,
  getShowResultsModal,
  getShowDeleteModal,
  getIsRefresh,
} = savannaSlice.actions;

export const savannaSliceReducer = savannaSlice.reducer;

export const changePlaySound = (value) => async (dispatch) => {
  try {
    dispatch(getPlaySound(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeIsRefresh = (value) => async (dispatch) => {
  try {
    dispatch(getIsRefresh(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeShowDeleteModal = (value) => async (dispatch) => {
  try {
    dispatch(getShowDeleteModal(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeShowResultsModal = (value) => async (dispatch) => {
  try {
    dispatch(getShowResultsModal(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeShowCloseModal = (value) => async (dispatch) => {
  try {
    dispatch(getShowCloseModal(value))
  } catch (error) {
    console.log(error);
  }
}

export const changeShowStart = (value) => async (dispatch) => {
  try {
    dispatch(getShowStart(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeWordNumber = (value) => async (dispatch) => {
  try {
    dispatch(getWordNumber(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeShowModal = (value) => async (dispatch) => {
  try {
    dispatch(toggleShowModal(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeWords = (value) => async (dispatch) => {
  try {
    dispatch(getWords(value));
  } catch (error) {
    console.log(error);
  }
}

export const getSavannaInfo = () => async (dispatch) => {
  try {
    const response = await Axios.get('https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0');
    console.log(response);
    const words = response.data.map((res) => {
      return {
        word: res.word,
        translate: res.wordTranslate,
        id: res.id,
        audio: res.audio,
      };
    });
    if (words) {
      dispatch(getWords(words));
      dispatch(toggleShowModal(true));
      dispatch(getWordNumber(0));
      dispatch(getShowStart(true));
      dispatch(getPlaySound(true));
      dispatch(getShowCloseModal(false));
      dispatch(getShowResultsModal(false));
      dispatch(getShowDeleteModal(false));
      dispatch(getIsRefresh(false));
    }
  } catch (error) {
    console.log(error);
  }
}
