import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { getUserWordsWithFilter } from '../../pages/home/HomeApi';

const initialSavannaState = {
  words: [],
  showModal: null,
  difficulity: 0,
  userWeakWords: 0,
  page: 0,
  wordNumber: 0,
  showStart: null,
  showCloseModal: null,
  showResultsModal: null,
  playSound: null,
  showDeleteModal: null,
  isRefresh: null,
  showChangeDifficulity: false,
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
    getDifficulity(state, action) {
      state.difficulity = action.payload;
    },
    getPage(state, action) {
      state.page = action.payload;
    },
    toggleShowChangeDifficulity(state, action) {
      state.showChangeDifficulity = action.payload;
    },
    getUserWeakWords(state, action) {
      state.userWeakWords = action.payload;
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
  getDifficulity,
  getPage,
  toggleShowChangeDifficulity,
  getUserWeakWords,
} = savannaSlice.actions;

export const savannaSliceReducer = savannaSlice.reducer;

export const changeUserWeakWords = (value) => async (dispatch) => {
  dispatch(getUserWeakWords(value));
};

export const changeShowChangeDifficulity = (value) => async (dispatch) => {
  dispatch(toggleShowChangeDifficulity(value));
};

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

export const changePage = (value) => async (dispatch, getState) => {
  dispatch(getPage(value));
  const curDif = getState().savanna.difficulity;
  const link = 'https://afternoon-falls-25894.herokuapp.com/words?';
  const response = await Axios.get(`${link}page=${value}&group=${curDif}`);
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
  }
};

export const changeDifficulity = (value) => async (dispatch, getState) => {
  dispatch(getDifficulity(value));
  const curPage = getState().savanna.page;

  const link = 'https://afternoon-falls-25894.herokuapp.com/words?';
  const response = await Axios.get(`${link}page=${curPage}&group=${value}`);
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
  }
}

export const getSavannaInfo = (isLogin) => async (dispatch, getState) => {
  const currentDifficulity = getState().savanna.difficulity;
  const currentPage = getState().savanna.page;
  const link = 'https://afternoon-falls-25894.herokuapp.com/words?';

  try {
    if (isLogin) {
      const response = await getUserWordsWithFilter('weak');
      const words = response.data[0].paginatedResults.map((res) => {
        return {
          word: res.word,
          translate: res.wordTranslate,
          id: res.id,
          audio: res.audio,
        };
      });

      if (words) {
        dispatch(getWords(words));
      }
    } else {
      const response = await Axios.get(`${link}page=${currentPage}&group=${currentDifficulity}`);

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
      }
    }

    dispatch(toggleShowModal(true));
    dispatch(getWordNumber(0));
    dispatch(getShowStart(true));
    dispatch(getPlaySound(true));
    dispatch(getShowCloseModal(false));
    dispatch(getShowResultsModal(false));
    dispatch(getShowDeleteModal(false));
    dispatch(getIsRefresh(false));
  } catch (error) {
    console.log(error);
  }
};
