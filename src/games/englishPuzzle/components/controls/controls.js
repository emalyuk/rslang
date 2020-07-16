import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTextHintState, setIsSound, setIsImg } from '../../EnglishPuzzleReducer';
import { Button } from '..';

const Controls = (props) => {
  const dispatch = useDispatch();
  const [isText, setTextState] = useState(false);
  const {
    translated, isTextHint, page, group, index, data,
    isSound, isImg,
  } = useSelector((state) => state.englishPuzzle);
  const { lvlStateSwitcher, resultStateSwitcher } = props;

  const audio = new Audio();

  const playSound = () => {
    const { audioExample } = data[index];
    audio.src = `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${audioExample}`;
    if (!isSound) audio.autoplay = true;
  }

  useEffect(() => {
    playSound()
  }, []);

  useEffect(() => {
    playSound()
  }, [index]);

  const soundBtnClickHandler = () => {
    dispatch(setIsSound)
  }

  const textBtnClickHandler = () => {
    setTextState(!isText)
    dispatch(changeTextHintState);
  }

  const playBtnClickHandler = () => {
    playSound()
  }

  const imageBtnClickHandler = () => {
    dispatch(setIsImg)
  }

  return (
    <div className='englishPuzzle__controls'>
      <Button
        className='englishPuzzle__levelBtn'
        text={`Уровень ${group + 1}.${page + 1}`}
        clickHandler={lvlStateSwitcher}
      />
      <div className='englishPuzzle__textHint'>{isTextHint ? translated : null}</div>
      <Button
        className={`englishPuzzle__soundBtn ${isSound ? 'englishPuzzle__soundBtn--active' : ''}`}
        text=''
        clickHandler={soundBtnClickHandler}
      />
      <Button
        className={`englishPuzzle__textBtn ${isTextHint ? 'englishPuzzle__textBtn--active' : ''}`}
        text=''
        clickHandler={textBtnClickHandler}
      />
      <Button
        className='englishPuzzle__playBtn'
        text=''
        clickHandler={playBtnClickHandler}
      />
      <Button
        className={`englishPuzzle__imageBtn ${isImg ? 'englishPuzzle__imageBtn--active' : ''}`}
        text=''
        clickHandler={imageBtnClickHandler}
      />
    </div>
  )
}

export default Controls;
