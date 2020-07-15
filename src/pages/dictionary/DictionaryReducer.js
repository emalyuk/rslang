import { createSlice } from '@reduxjs/toolkit';
import { getUserWordsWithFilter } from 'pages/home/HomeApi';

const initialDictionaryState = {
  showDeleteModal: false,
  isSelect: false,
  trash: [],
  isAllSelected: false,
  deletedWords: [],
  difficultWords: [],
  studiedWords: [],
  currentTab: 'all',
  isLoadingWords: false,
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
    getLoadingWords(state, action) {
      state.isLoadingWords = action.payload;
    },
  },
});

export const {
  getTrash,
  getSelect,
  toggleDeleteModal,
  getIsAllSelected,
  getDeletedWords,
  getDifficultWords,
  getStudiedWords,
  getCurrentTab,
  getLoadingWords,
} = dictionarySlice.actions;

export const dictionarySliceReducer = dictionarySlice.reducer;

export const changeIsLoadingWords = (value) => async (dispatch) => {
  dispatch(getLoadingWords(value));
};

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

export const updateAllWords = () => async (dispatch) => {
  try {
    const difficultFetchWords = await getUserWordsWithFilter('hard');
    const studiedFetchWords = await getUserWordsWithFilter('weak');
    const deletedFetchWords = await getUserWordsWithFilter('deleted');
    dispatch(getDifficultWords(difficultFetchWords.data[0].paginatedResults));
    dispatch(getStudiedWords(studiedFetchWords.data[0].paginatedResults));
    dispatch(getDeletedWords(deletedFetchWords.data[0].paginatedResults));
    dispatch(getLoadingWords(false));
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
