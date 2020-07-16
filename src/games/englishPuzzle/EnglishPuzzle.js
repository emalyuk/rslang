import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EnglishPuzzle.scss';
import {
  initState, changeLvl, initWithSetting, setIsImgLoaded,
} from './EnglishPuzzleReducer';
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
  const [isSmallDevice, setSmallDevice] = useState(false);
  const {
    isDataLoaded, width, height, pictureLink, rows,
    page, group, isImgLoaded, switchLvl,
  } = useSelector((state) => state.englishPuzzle);

  const createImg = () => {
    const canvasHeigh = height * rows.length;
    const img = document.createElement('img');
    img.src = pictureLink;
    img.onload = () => {
      const newImg = document.createElement('img');
      newImg.src = resizeImage(img, width, canvasHeigh);
      setResizedImage(newImg)
      dispatch(setIsImgLoaded())
    }
  }

  const nextRound = () => {
    dispatch(changeLvl)
  }

  const checkViewportSize = () => {
    if (window.innerWidth <= 768) {
      setSmallDevice(true)
      console.log(window.innerWidth);
    } else {
      setSmallDevice(false)
    }
  }

  useEffect(() => {
    checkViewportSize()
    const settings = getLocalStorage('englishPuzzleSettings')
    if (settings) {
      dispatch(initWithSetting(settings))
    } else {
      dispatch(initState(page, group))
    }

    window.addEventListener('resize', checkViewportSize)
  }, []);

  useEffect(() => {
    if (switchLvl) dispatch(initState(page, group))
  }, [switchLvl]);

  useEffect(() => {
    if (pictureLink) createImg();
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

  const setSmallDeviceContent = (
    <div className='englishPuzzle__smallDeviceText'>
      Извините, ваш дисплей маленького размера.
      Для вашего удобства используйте устройство с экраном большего размера
    </div>
  );


  return (
    <div className='englishPuzzle'>
      {((!isSmallDevice && !isImgLoaded) || (!isSmallDevice && !isDataLoaded)) && <Spinner />}
      {((!isSmallDevice && isDataLoaded) && (!isSmallDevice && isImgLoaded)) && mainContent}
      {isSmallDevice && setSmallDeviceContent}
    </div>
  )
}

export default EnglishPuzzle;
