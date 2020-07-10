import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EnglishPuzzle.scss';
import { initState, imageLoaded } from './EnglishPuzzleReducer';
import {
  Controls, Surface, Shuffled, Actions,
} from './components';
import { resizeImage } from './EnglishPuzzleUtils'

const EnglishPuzzle = () => {
  const dispatch = useDispatch();
  const [resizedImage, setResizedImage] = useState(null);
  const {
    isDataLoaded, isImgLoaded, width, height, pictureLink, rows,
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
    dispatch(initState(width, height))
  }, []);

  useEffect(() => {
    createImg();
  }, [pictureLink]);

  const mainContent = (
    <div className='container englishPuzzle__wrapper'>
      <Controls />
      <Surface
        image={resizedImage}
      />
      <Shuffled
        image={resizedImage}
      />
      <Actions />
    </div>
  );

  return (
    <div className='englishPuzzle'>
      {(!isDataLoaded || !isImgLoaded) && <div>Loading....</div>}
      {(isDataLoaded && isImgLoaded) && mainContent}
    </div>
  )
}

export default EnglishPuzzle;
