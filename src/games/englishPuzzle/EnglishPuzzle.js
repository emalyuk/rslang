import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EnglishPuzzle.scss';
import { initState, imageLoaded, changeLvl, initWithSetting } from './EnglishPuzzleReducer';
import { Spinner } from '../../components';
import {
  Controls, Surface, Shuffled, Actions,
  Popup, Level, Results,
} from './components';
import { resizeImage, getLocalStorage } from './EnglishPuzzleUtils'

const EnglishPuzzle = () => {
  const dispatch = useDispatch();
  const [resizedImage, setResizedImage] = useState(null);
  const [isLvlSwitcher, setLvlSwitcherState] = useState(false);
  const [isResultActive, setResultState] = useState(false);
  const {
    isDataLoaded, width, height, pictureLink, rows,
    page, group,
  } = useSelector((state) => state.englishPuzzle);
  const st = useSelector((state) => state.englishPuzzle);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const createImg = () => {
    const canvasHeigh = height * rows.length;
    const img = document.createElement('img');
    img.src = pictureLink;
    img.onload = () => {
      const newImg = document.createElement('img');
      newImg.src = resizeImage(img, width, canvasHeigh);
      setResizedImage(newImg)
      console.log('ffff')
      setIsImgLoaded(true)
    }
  }

  const nextRound = () => {
    dispatch(changeLvl)
  }

  useEffect(() => {
    // const settings = getLocalStorage('englishPuzzleSettings')
    // if (settings && firstLoad) {
    //   dispatch(initWithSetting(settings))
    // } else {
    //   dispatch(initState(page, group))
    // }
    // setFirstLoad(false)
  }, []);

  useEffect(() => {
    console.log('asdfas')
    // if (!firstLoad) dispatch(initState(page, group))
    const settings = getLocalStorage('englishPuzzleSettings')
    if (settings) {
      console.log('settings')
      dispatch(initWithSetting(settings))
    } else {
      console.log('item')
      dispatch(initState(page, group))
    }
  }, [page, group]);


  useEffect(() => {
    createImg();
  }, [pictureLink]);

  const mainContent = (
    <div className='container englishPuzzle__wrapper'>
      <Controls
        lvlStateSwitcher={() => setLvlSwitcherState(!isLvlSwitcher)}
      />
      <Surface
        image={resizedImage}
      />
      <Shuffled
        image={resizedImage}
      />
      <Actions
        resultStateSwitcher={() => setResultState(!isResultActive)}
        nextRound={nextRound}
      />
      <Popup
        isActive={isLvlSwitcher}
        onClick={() => setLvlSwitcherState(false)}
      >
        <Level
          hidePopup={() => setLvlSwitcherState(false)}
        />
      </Popup>
      <Popup
        isActive={isResultActive}
        onClick={() => setResultState(false)}
      >
        <Results
          lvlSwitcher={nextRound}
          resultStateSwitcher={() => setResultState(false)}
        />
      </Popup>
    </div>
  );

  return (
    <div className='englishPuzzle'>
      {(!isDataLoaded || !isImgLoaded) && <Spinner />}
      {(isDataLoaded && isImgLoaded) && mainContent}
    </div>
  )
}

export default EnglishPuzzle;
