/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { getData } from './EnglishPuzzleApi';
import { createRows } from './EnglishPuzzleUtils';

const initialEnglishPuzzleState = {
  data: [],
  isDataLoaded: false,
  isImgLoaded: false,
  index: 0,
  isEnd: false,
  width: 600,
  height: 45,
  actionsType: 'dont',
  rows: [{
    isVisible: false,
    isGuessed: false,
    isCurrent: false,
    sentence: [],
  }],
};

const englishPuzzleSlice = createSlice({
  name: 'englishPuzzle',
  initialState: { ...initialEnglishPuzzleState },
  reducers: {
    init(state, action) {
      const { data, rows } = action.payload;
      state.data = data;
      state.rows = rows;
      state.isEnd = false;
      state.isDataLoaded = true;
      state.shuffled = state.data[state.index].shuffled;
      state.pictureLink = '/img/test.jpg';
    },
    imageLoaded(state, action) {
      state.isImgLoaded = true;
    },
    toGuessingRow(state, action) {
      const { id } = action.payload;
      const wordObj = state.shuffled.filter((elem) => elem.id === id);
      state.shuffled = state.shuffled.filter((elem) => elem.id !== id);
      state.rows[state.index].sentence = [...state.rows[state.index].sentence, ...wordObj]
    },
    toCurrentRow(state, action) {
      const { id } = action.payload;
      const wordObj = state.rows[state.index].sentence.filter((elem) => elem.id === id);
      state.rows[state.index].sentence = state.rows[state.index].sentence.filter((elem) => elem.id !== id);
      state.shuffled = [...state.shuffled, ...wordObj]
    },
    sortGuessingRow(state, action) {
      let { targetIndex } = action.payload;
      const { draggedIndex, insertPosition, indexFromAnotherNode } = action.payload;
      const stateCopy = state.shuffled.slice();
      if (targetIndex > draggedIndex) targetIndex -= 1;
      const pos = (insertPosition === 'before') ? targetIndex : targetIndex + 1;

      if (indexFromAnotherNode || indexFromAnotherNode === 0) {
        const elemFromAnotherNode = state.rows[state.index].sentence[indexFromAnotherNode];
        state.rows[state.index].sentence = state.rows[state.index].sentence.filter((elem, ind) => {
          return ind !== indexFromAnotherNode;
        });
        if (!targetIndex) {
          state.shuffled = [...stateCopy, elemFromAnotherNode];
        } else {
          stateCopy.splice(pos, 0, elemFromAnotherNode);
          state.shuffled = stateCopy;
        }
        return;
      }
      if (targetIndex || targetIndex === 0) {
        const draggedElem = state.shuffled[draggedIndex];
        stateCopy.splice(draggedIndex, 1);
        stateCopy.splice(pos, 0, draggedElem);
        state.shuffled = stateCopy;
      }
    },
    sortCurrentRow(state, action) {
      let { targetIndex } = action.payload;
      const { draggedIndex, insertPosition, indexFromAnotherNode } = action.payload;
      const stateCopy = state.rows[state.index].sentence.slice();
      if (targetIndex > draggedIndex) targetIndex -= 1;
      const pos = (insertPosition === 'before') ? targetIndex : targetIndex + 1;

      if (indexFromAnotherNode || indexFromAnotherNode === 0) {
        const elemFromAnotherNode = state.shuffled[indexFromAnotherNode];
        state.shuffled = state.shuffled.filter((elem, ind) => ind !== indexFromAnotherNode);
        if (!targetIndex) {
          state.rows[state.index].sentence = [...stateCopy, elemFromAnotherNode];
        } else {
          stateCopy.splice(pos, 0, elemFromAnotherNode);
          state.rows[state.index].sentence = stateCopy;
        }
        return;
      }
      if (targetIndex || targetIndex === 0) {
        const draggedElem = state.rows[state.index].sentence[draggedIndex];
        stateCopy.splice(draggedIndex, 1);
        stateCopy.splice(pos, 0, draggedElem);
        state.rows[state.index].sentence = stateCopy;
      }
    },
    dontKnow(state, action) {
      const sorted = [...state.data[state.index].shuffled].sort((objA, objB) => {
        return objA.position - objB.position;
      })
      state.shuffled = [];
      state.rows[state.index].sentence = sorted;
      state.rows[state.index].isUseHint = true;

      if (state.rows.length - 1 === state.index) {
        state.isEnd = true;
        state.rows[state.index].isCurrent = false;
      }
    },
    switchWord(state, action) {
      state.rows[state.index].isCurrent = false;
      console.log('....')
      const newIndex = state.index + 1;
      if (newIndex > state.rows.length - 1) {
        state.isEnd = true;
      } else {
        state.index = newIndex;
        state.shuffled = state.data[state.index].shuffled;
        state.rows[state.index].isVisible = true;
        state.rows[state.index].isCurrent = true;
      }
    },
    changeActionType(state, action) {
      const { type } = action.payload;
      state.actionsType = type;
    },
    check(state, action) {
      let sentence = state.rows[state.index].sentence.slice();
      const reference = state.rows[state.index].wordsArr.slice();
      const checked = sentence.map((obj, index) => {
        if (obj.word === reference[index]) {
          obj.isRightPos = true;
          return obj;
        }
        obj.isRightPos = false;
        return obj;
      })
      const isGuessed = sentence.every((obj) => obj.isRightPos);
      if (isGuessed) {
        if (state.rows.length - 1 === state.index) {
          state.isEnd = true;
          state.rows[state.index].isCurrent = false;
          sentence = sentence.map((obj) => {
            delete obj.isRightPos
            return obj;
          });
        } else {
          state.actionsType = 'continue';
        }
        state.rows[state.index].isGuessed = true;
      } else {
        state.actionsType = 'dont';
      }
      state.rows[state.index].sentence = sentence;
    },
    resetWords(state, aciton) {
      const sentence = state.rows[state.index].sentence.slice();
      const checked = sentence.map((obj, index) => {
        if (typeof obj.isRightPos !== 'undefined') delete obj.isRightPos
        return obj;
      })
      state.rows[state.index].sentence = sentence;
    },
  },
});

export const {
  init,
  imageLoaded,
  toCurrentRow,
  toGuessingRow,
  sortGuessingRow,
  sortCurrentRow,
  dontKnow,
  switchWord,
  changeActionType,
  check,
  resetWords,
} = englishPuzzleSlice.actions;

export const englishPuzzleReducer = englishPuzzleSlice.reducer;

export const initState = (width, height) => async (dispatch) => {
  try {
    const data = await getData(width, height);
    console.log(data)
    if (data) {
      const rows = createRows(data);
      dispatch(init({ data, rows }));
    } else {
      console.log('no data');
    }
  } catch (err) {
    console.log(err);
  }
}
