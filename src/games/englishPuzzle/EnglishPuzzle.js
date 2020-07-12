import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EnglishPuzzle.scss';
import { initState, imageLoaded } from './EnglishPuzzleReducer';
import { Spinner } from '../../components';
import {
  Controls, Surface, Shuffled, Actions,
  Popup, Level,
} from './components';
import { resizeImage } from './EnglishPuzzleUtils'

const EnglishPuzzle = () => {
  const dispatch = useDispatch();
  const [resizedImage, setResizedImage] = useState(null);
  const [isLvlSwitcher, setLvlSwitcherState] = useState(false);
  const {
    isDataLoaded, isImgLoaded, width, height, pictureLink, rows,
    page, group,
  } = useSelector((state) => state.englishPuzzle);

  const createImg = () => {
    const canvasHeigh = height * rows.length;
    const img = document.createElement('img');
    img.src = pictureLink;
    img.onload = () => {
      const newImg = document.createElement('img');
      newImg.src = resizeImage(img, width, canvasHeigh);
      setResizedImage(newImg)
      dispatch(imageLoaded())
    }
  }

  useEffect(() => {
    dispatch(initState(page, group))
  }, []);

  useEffect(() => {
    dispatch(initState(page, group))
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
      <Actions />
      <Popup
        isActive={isLvlSwitcher}
        onClick={() => setLvlSwitcherState(false)}
      >
        <Level
          hidePopup={() => setLvlSwitcherState(false)}
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
