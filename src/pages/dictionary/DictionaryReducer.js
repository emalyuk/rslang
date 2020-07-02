import { createSlice } from '@reduxjs/toolkit';
import fetchWords from '../../utils/fetchWords';
import shuffleArray from '../../utils/shuffleArray';

const initialDictionaryState = {
  showDeleteModal: false,
  isSelect: false,
  words: [],
  trash: [],
  isAllSelected: false,
  deletedWords: [],
  difficultWords: [],
  studiedWords: [],
  currentTab: 'all',
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: { ...initialDictionaryState },
  reducers: {
    getTrash(state, action) {
      state.trash = action.payload;
    },
    toggleDeleteModal(state, action) {
      state.showDeleteModal = action.payload;
    },
    getWords(state, action) {
      state.words = action.payload;
    },
    getSelect(state, action) {
      state.isSelect = action.payload;
    },
    getIsAllSelected(state, action) {
      state.isAllSelected = action.payload;
    },
    getDeletedWords(state, action) {
      state.deletedWords = action.payload;
    },
    getStudiedWords(state, action) {
      state.studiedWords = action.payload;
    },
    getDifficultWords(state, action) {
      state.difficultWords = action.payload;
    },
    getCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export const {
  getWords,
  getTrash,
  getSelect,
  toggleDeleteModal,
  getIsAllSelected,
  getDeletedWords,
  getDifficultWords,
  getStudiedWords,
  getCurrentTab,
} = dictionarySlice.actions;

export const dictionarySliceReducer = dictionarySlice.reducer;

export const changeCurrentTab = (value) => async (dispatch) => {
  try {
    dispatch(getCurrentTab(value));
  } catch (error) {
    console.log(error);
  }
}

export const toggleIsAllSelected = (value) => async (dispatch) => {
  try {
    dispatch(getIsAllSelected(value));
  } catch (error) {
    console.log(error);
  }
}

export const toggleIsSelect = (value) => async (dispatch) => {
  try {
    dispatch(getSelect(value));
  } catch (error) {
    console.log(error);
  }
}

export const changeShowDeleteModal = (value) => async (dispatch) => {
  try {
    dispatch(toggleDeleteModal(value));
  } catch (error) {
    console.log(error);
  }
};

export const updateDeletedWords = (value) => async (dispatch) => {
  try {
    dispatch(getDeletedWords(value));
  } catch (error) {
    console.log(error);
  }
};

export const updateStudiedWords = (value) => async (dispatch) => {
  try {
    dispatch(getStudiedWords(value));
  } catch (error) {
    console.log(error);
  }
};

export const updateDifficultWords = (value) => async (dispatch) => {
  try {
    dispatch(getDifficultWords(value));
  } catch (error) {
    console.log(error);
  }
};

export const updateWords = (value) => async (dispatch) => {
  try {
    dispatch(getWords(value));
  } catch (error) {
    console.log(error);
  }
};

export const updateAllWords = () => async (dispatch) => {
  try {
    const difficultFetchWords = await fetchWords(0, 3);
    const studiedFetchWords = await fetchWords(0, 0);
    dispatch(getDifficultWords(difficultFetchWords));
    dispatch(getStudiedWords(studiedFetchWords))
    const allWordsArray = shuffleArray(difficultFetchWords.concat(studiedFetchWords, []));
    dispatch(getWords(allWordsArray))
  } catch (error) {
    console.log(error);
  }
};

export const updateTrash = (value) => async (dispatch) => {
  try {
    dispatch(getTrash(value));
  } catch (error) {
    console.log(error);
  }
};
