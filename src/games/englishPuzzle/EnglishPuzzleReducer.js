/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { getData } from './EnglishPuzzleApi';
import {
  createRows, getImgData, setLocalStorage, getLocalStorage,
  postStat, setLocalStorageStat,
} from './EnglishPuzzleUtils';

const saved = getLocalStorage('englishPuzzleSettings')

const initialEnglishPuzzleState = {
  data: [],
  isImgLoaded: false,
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
    setIsImgLoaded(state, action) {
      state.isImgLoaded = true;
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
    updateTextHint(state, action) {
      state.isTextHint = action.payload.isTextHint;
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
      state.isImg = action.payload.isImg
    },
    updateIsSound(state, action) {
      state.isSound = action.payload.isSound;
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
    updateSwitchLvl(state, action) {
      state.switchLvl = action.payload.switchLvl;
    },
  },
});

export const {
  init, setIsEnd, imageLoaded, setDataLoad, toCurrentRow,
  toGuessingRow, updateGuessingRow, updateCurrentRow, updateIsGuessed,
  updateIsCurrent, changeActionType, updateTextHint, changeCurrentGroup,
  changeCurrentPage, updateImgData, updateIsSound, updateIsImg, updateIsUseHint,
  updateIsEnd, updateTranslated, updateIsVisible, updateIndex, globalReset,
  updatePictureLink, updateRows, updateData, setIsImgLoaded, updateSwitchLvl,
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
      dispatch(updateSwitchLvl({ switchLvl: false }))
    } else {
      console.warn('no data');
    }
  } catch (err) {
    console.log(err);
  }
}

export const initWithSetting = (state) => (dispatch, getState) => {
  const {
    pictureLink, actionsType, data, group, page, index,
    rows, imgData, isImg, isTextHint, isSound, translated,
  } = state;
  delete state.pictureLink;
  delete state.isDataLoaded;
  delete state.switchLvl;
  dispatch(updateIsImg({ isImg }));
  dispatch(updateTextHint({ isTextHint }));
  dispatch(updateTranslated({ translated }))
  dispatch(updateIsSound({ isSound }));
  dispatch(changeCurrentGroup({ group }))
  dispatch(changeCurrentPage({ page }))
  dispatch(updateIndex({ index }))
  dispatch(updateData({ data }))
  dispatch(updateRows({ rows }))
  dispatch(updateGuessingRow({ shuffled: data[index].shuffled }))
  dispatch(updateImgData({ imgData }));
  dispatch(changeActionType({ type: actionsType }))
  dispatch(updatePictureLink({ pictureLink }))
  dispatch(setDataLoad({ isDataLoaded: true }));
}

export const changePage = (page) => (dispatch, getState) => {
  const { englishPuzzle } = getState();
  dispatch(setDataLoad({ isDataLoaded: false }));
  dispatch(changeCurrentPage({ page }))
  dispatch(updateSwitchLvl({ switchLvl: true }))
  setLocalStorage('englishPuzzleSettings', { ...englishPuzzle, page })
}

export const changeGroup = (group) => (dispatch, getState) => {
  const { englishPuzzle, englishPuzzle: { page } } = getState();
  dispatch(setDataLoad({ isDataLoaded: false }));
  dispatch(changeCurrentGroup({ group }))
  dispatch(updateSwitchLvl({ switchLvl: true }))
  if (group >= 3 && page > 24) {
    dispatch(changeCurrentPage({ page: 0 }))
  }
  setLocalStorage('englishPuzzleSettings', { ...englishPuzzle, group })
}

export const changeLvl = (dispatch, getState) => {
  const { englishPuzzle: { group, page }, englishPuzzle } = getState();
  dispatch(setDataLoad({ isDataLoaded: false }));
  dispatch(updateSwitchLvl({ switchLvl: true }))
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

const isGuess = (dispatch, rows, index, copy, englishPuzzle) => {
  if (rows.length - 1 === index) {
    dispatch(setIsEnd({ isEnd: true }));
    dispatch(updateIsCurrent({ isCurrent: true }))
    copy = copy.map((obj) => {
      delete obj.isRightPos
      return obj;
    });
    postStat(englishPuzzle)
    setLocalStorageStat(englishPuzzle)
  } else {
    dispatch(changeActionType({ type: 'continue' }))
  }
  dispatch(updateIsGuessed({ isGuessed: true }))
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

export const checkSurface = (dispatch, getState) => {
  const { englishPuzzle: { shuffled, rows, index }, englishPuzzle } = getState();
  const { sentence, wordsArr } = rows[index];
  const copy = JSON.parse(JSON.stringify(sentence));
  const checked = copy.map((obj, i) => {
    if (obj.word === wordsArr[i]) obj.isRightPos = true;
    if (obj.word !== wordsArr[i]) obj.isRightPos = false;
    return obj;
  });
  const isGuessed = copy.every((obj) => obj.isRightPos);
  if (isGuessed) {
    isGuess(dispatch, rows, index, copy, englishPuzzle)
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
  const { englishPuzzle, englishPuzzle: { isSound } } = getState();
  dispatch(updateIsSound({ isSound: !isSound }));
  setLocalStorage('englishPuzzleSettings', { ...englishPuzzle, isSound: !isSound })
}

export const setIsImg = (dispatch, getState) => {
  const { englishPuzzle, englishPuzzle: { isImg } } = getState();
  dispatch(updateIsImg({ isImg: !isImg }));
  setLocalStorage('englishPuzzleSettings', { ...englishPuzzle, isImg: !isImg })
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
    dispatch(setIsEnd({ isEnd: true }));
    dispatch(updateIsCurrent({ isCurrent: false }))
    postStat(englishPuzzle)
    setLocalStorageStat(englishPuzzle)
  }
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

export const switchWord = (dispatch, getState) => {
  const { englishPuzzle: { index, rows, data }, englishPuzzle } = getState();
  const newIndex = index + 1;
  dispatch(updateIsCurrent({ isCurrent: false }))
  if (newIndex > rows.length - 1) {
    dispatch(setIsEnd({ isEnd: true }));
    dispatch(updateTextHint({ isTextHint: true }))
    postStat(englishPuzzle)
    setLocalStorageStat(englishPuzzle)
  } else {
    dispatch(updateIndex({ index: newIndex }))
    dispatch(updateGuessingRow({ shuffled: data[newIndex].shuffled }))
    dispatch(updateTranslated({ translated: data[newIndex].textExampleTranslate }))
    dispatch(updateIsVisible())
    dispatch(updateIsCurrent({ isCurrent: true }))
  }
  setLocalStorage('englishPuzzleSettings', englishPuzzle)
}

export const changeTextHintState = (dispatch, getState) => {
  const { englishPuzzle, englishPuzzle: { isTextHint } } = getState();
  dispatch(updateTextHint({ isTextHint: !isTextHint }))
  setLocalStorage('englishPuzzleSettings', { ...englishPuzzle, isTextHint: !isTextHint })
}
