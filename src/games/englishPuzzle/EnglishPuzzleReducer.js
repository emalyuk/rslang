/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { getData } from './EnglishPuzzleApi';
import {
  createRows, getImgData, setLocalStorage, getLocalStorage,
} from './EnglishPuzzleUtils';

const saved = getLocalStorage('englishPuzzleSettings')

const initialEnglishPuzzleState = {
  data: [],
  isDataLoaded: false,
  isTextHint: false,
  isImg: false,
  isSound: false,
  index: 0,
  page: 0,
  group: 0,
  isEnd: false,
  width: 600,
  height: 45,
  actionsType: 'dont',
  pictureLink: null,
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
    updateRows(state, action) {
      state.rows = action.payload.rows;
    },
    updateData(state, action) {
      state.data = action.payload.data;
    },
    globalReset(state, action) {
      state = action.payload.state;
    },
    setIsEnd(state, action) {
      state.isEnd = action.payload.isEnd;
    },
    setDataLoad(state, action) {
      state.isDataLoaded = action.payload.isDataLoaded;
    },
    updateImgData(state, action) {
      state.imgData = action.payload.imgData;
    },
    imageLoaded(state, action) {
      console.log('imgloade')
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
      state.rows[state.index].sentence = state.rows[state.index].sentence.filter((elem) => {
        return elem.id !== id;
      });
      state.shuffled = [...state.shuffled, ...wordObj]
    },
    updateGuessingRow(state, action) {
      state.shuffled = action.payload.shuffled;
    },
    updateCurrentRow(state, action) {
      state.rows[state.index].sentence = action.payload.sentence;
    },
    changeActionType(state, action) {
      state.actionsType = action.payload.type;
    },
    changeTextHintState(state, action) {
      state.isTextHint = !state.isTextHint;
    },
    changeCurrentPage(state, action) {
      state.page = action.payload.page;
    },
    changeCurrentGroup(state, action) {
      state.group = action.payload.group;
    },
    updateIsGuessed(state, action) {
      state.rows[state.index].isGuessed = action.payload.isGuessed;
    },
    updateIsCurrent(state, action) {
      state.rows[state.index].isCurrent = action.payload.isCurrent;
    },
    updateIsImg(state, action) {
      state.isImg = !state.isImg
    },
    updateIsSound(state, action) {
      state.isSound = !state.isSound;
    },
    updateIsEnd(state, action) {
      state.isEnd = !state.isEnd;
    },
    updateIsUseHint(state, action) {
      state.rows[state.index].isUseHint = true;
    },
    updateIndex(state, action) {
      state.index = action.payload.index;
    },
    updateTranslated(state, action) {
      state.translated = action.payload.translated
    },
    updateIsVisible(state, action) {
      state.rows[state.index].isVisible = true;
    },
    updatePictureLink(state, action) {
      state.pictureLink = action.payload.pictureLink;
    },
  },
});

export const {
  init, setIsEnd, imageLoaded, setDataLoad, toCurrentRow,
  toGuessingRow, updateGuessingRow, updateCurrentRow, updateIsGuessed,
  updateIsCurrent, changeActionType, changeTextHintState, changeCurrentGroup,
  changeCurrentPage, updateImgData, updateIsSound, updateIsImg, updateIsUseHint,
  updateIsEnd, updateTranslated, updateIsVisible, updateIndex, globalReset,
  updatePictureLink, updateRows, updateData,
} = englishPuzzleSlice.actions;

export const englishPuzzleReducer = englishPuzzleSlice.reducer;

export const initState = (page, group) => async (dispatch, getState) => {
  const { englishPuzzle: { width, height }, englishPuzzle } = getState();
  try {
    const data = await getData(width, height, page, group);
    const imgData = getImgData(page, group)
    if (data) {
      const rows = createRows(data);
      dispatch(updateIndex({ index: 0 }))
      dispatch(setIsEnd({ isEnd: false }));
      dispatch(updateData({ data }));
      dispatch(updateRows({ rows }));
      dispatch(updateGuessingRow({ shuffled: data[0].shuffled }))
      dispatch(updateImgData({ imgData }));
      dispatch(setDataLoad({ isDataLoaded: true }));
      dispatch(updatePictureLink({ pictureLink: imgData.imageSrc }))
      dispatch(updateTranslated({ translated: data[0].textExampleTranslate }))
    } else {
      console.warn('no data');
    }
  } catch (err) {
    console.log(err);
  }
}

export const initWithSetting = (settings) => (dispatch, getState) => {
  dispatch(globalReset({ settings }));
  console.log(settings)
  // dispatch(updateIndex({ index: 0 }))
  // dispatch(setIsEnd({ isEnd: false }));
  // dispatch(updateRows({ rows }));
  // dispatch(updateGuessingRow({ shuffled: data[0].shuffled }))
  // dispatch(updateImgData({ imgData }));
  // dispatch(setDataLoad({ isDataLoaded: true }));
  // dispatch(updatePictureLink({ pictureLink: imgData.imageSrc }))
  // dispatch(updateTranslated({ translated: data[0].textExampleTranslate }))
}

export const changePage = (page) => (dispatch, getState) => {
  dispatch(setDataLoad({ isDataLoaded: false }));
  dispatch(changeCurrentPage({ page }))
}

export const changeGroup = (group) => (dispatch, getState) => {
  dispatch(setDataLoad({ isDataLoaded: false }));
  dispatch(changeCurrentGroup({ group }))
}

export const changeLvl = (dispatch, getState) => {
  const { englishPuzzle: { group, page }, englishPuzzle } = getState();
  dispatch(setDataLoad({ isDataLoaded: false }));
  const pageLimit = (group < 3) ? 29 : 24;
  if (page === pageLimit) {
    const newGroupVal = group === 5 ? 0 : group + 1;
    dispatch(changeCurrentGroup({ group: newGroupVal }))
    dispatch(changeCurrentPage({ page: 0 }))
  } else {
    dispatch(changeCurrentPage({ page: page + 1 }))
  }
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

const updateR = (dispatch, flag, newState, reverse) => {
  if (!reverse) {
    if (flag) dispatch(updateCurrentRow({ sentence: newState }))
    if (!flag) dispatch(updateGuessingRow({ shuffled: newState }))
  }
  if (reverse) {
    if (flag) dispatch(updateGuessingRow({ shuffled: newState }))
    if (!flag) dispatch(updateCurrentRow({ sentence: newState }));
  }
}

export const sort = (tgInd, dragInd, insPos, indFrom, flag) => (dispatch, getState) => {
  const { englishPuzzle: { shuffled, rows, index }, englishPuzzle } = getState();
  const { sentence } = rows[index];
  const first = flag ? sentence : shuffled;
  const second = flag ? shuffled : sentence;
  const stateCopy = first.slice();
  if (dragInd) tgInd = (tgInd > dragInd) ? tgInd -= 1 : tgInd;
  const pos = (insPos === 'before') ? tgInd : tgInd + 1;

  if (indFrom || indFrom === 0) {
    const elemFromAnotherNode = second[indFrom];
    const filtered = second.filter((elem, ind) => ind !== indFrom);
    if (!tgInd) {
      const newState = [...stateCopy, elemFromAnotherNode];
      updateR(dispatch, flag, newState, false)
      updateR(dispatch, flag, filtered, true)
    } else {
      stateCopy.splice(pos, 0, elemFromAnotherNode);
      updateR(dispatch, flag, stateCopy, false)
      updateR(dispatch, flag, filtered, true)
    }
    setLocalStorage('englishPuzzleSettings', englishPuzzle)
    return false;
  }
  if (tgInd || tgInd === 0) {
    const draggedElem = first[dragInd];
    stateCopy.splice(dragInd, 1);
    stateCopy.splice(pos, 0, draggedElem);
    updateR(dispatch, flag, stateCopy, false)
    setLocalStorage('englishPuzzleSettings', englishPuzzle)
  }
  return false;
}

const isGuess = (dispatch, rows, index, copy) => {
  if (rows.length - 1 === index) {
    dispatch(setIsEnd({ isEnd: true }));
    dispatch(updateIsCurrent({ isCurrent: true }))
    copy = copy.map((obj) => {
      delete obj.isRightPos
      return obj;
    });
  } else {
    dispatch(changeActionType({ type: 'continue' }))
  }
  dispatch(updateIsGuessed({ isGuessed: true }))
}

export const checkSurface = (dispatch, getState) => {
  const { englishPuzzle: { shuffled, rows, index }, englishPuzzle } = getState();
  const { sentence, wordsArr } = rows[index];
  let copy = JSON.parse(JSON.stringify(sentence));
  const checked = copy.map((obj, i) => {
    if (obj.word === wordsArr[i]) obj.isRightPos = true;
    if (obj.word !== wordsArr[i]) obj.isRightPos = false;
    return obj;
  });
  const isGuessed = copy.every((obj) => obj.isRightPos);
  if (isGuessed) {
    isGuess(dispatch, rows, index, copy)
  } else {
    dispatch(changeActionType({ type: 'dont' }))
  }
  dispatch(updateCurrentRow({ sentence: copy }))
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

export const resetWords = (dispatch, getState) => {
  const { englishPuzzle: { shuffled, rows, index }, englishPuzzle } = getState();
  const { sentence } = rows[index];
  let copy = JSON.parse(JSON.stringify(sentence));
  copy = copy.map((obj) => {
    if (typeof obj.isRightPos !== 'undefined') delete obj.isRightPos
    return obj;
  })
  dispatch(updateCurrentRow({ sentence: copy }))
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

export const setIsSound = (dispatch, getState) => {
  const { englishPuzzle } = getState();
  dispatch(updateIsSound());
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

export const setIsImg = (dispatch) => {
  dispatch(updateIsImg());
}

export const ifDontKnow = (dispatch, getState) => {
  const { englishPuzzle: { data, index, rows }, englishPuzzle } = getState();
  const sorted = [...data[index].shuffled].sort((objA, objB) => {
    return objA.position - objB.position;
  });
  dispatch(updateCurrentRow({ sentence: sorted }));
  dispatch(updateGuessingRow({ shuffled: [] }));
  dispatch(updateIsUseHint());

  if (rows.length - 1 === index) {
    dispatch(updateIsEnd())
    dispatch(updateIsCurrent({ isCurrent: false }))
  }
}

export const switchWord = (dispatch, getState) => {
  const { englishPuzzle: { index, rows, data }, englishPuzzle } = getState();
  const newIndex = index + 1;
  dispatch(updateIsCurrent({ isCurrent: false }))
  if (newIndex > rows.length - 1) {
    dispatch(updateIsEnd({ index: 0 }))
    dispatch(changeTextHintState())
  } else {
    dispatch(updateIndex({ index: newIndex }))
    dispatch(updateGuessingRow({ shuffled: data[newIndex].shuffled }))
    dispatch(updateTranslated({ translated: data[newIndex].textExampleTranslate }))
    dispatch(updateIsVisible())
    dispatch(updateIsCurrent({ isCurrent: true }))
  }
}
