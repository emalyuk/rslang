import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialDictionaryState = {
  showDeleteModal: false,
  isSelect: false,
  words: [],
  trash: [],
  isAllSelected: false,
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
  },
});

export const {
  getWords,
  getTrash,
  getSelect,
  toggleDeleteModal,
  getIsAllSelected,
} = dictionarySlice.actions;

export const dictionarySliceReducer = dictionarySlice.reducer;

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

export const updateWords = () => async (dispatch) => {
  try {
    const response = await Axios.get('https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0');
    const words = response.data.map((res) => {
      return {
        word: res.word,
        translate: res.wordTranslate,
        id: res.id,
        audio: res.audio,
        image: res.image,
      };
    });
    dispatch(getWords(words));
  } catch (error) {
    console.log(error);
  }
};

export const updateTrash = (value) => async (dispatch) => {
  try {
    console.log(value);
    dispatch(getTrash(value));
  } catch (error) {
    console.log(error);
  }
};
