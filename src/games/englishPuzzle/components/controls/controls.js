import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTextHintState } from '../../EnglishPuzzleReducer';
import { Button } from '..';

const Controls = (props) => {
  const dispatch = useDispatch();
  const [isSound, setSoundState] = useState(false);
  const [isText, setTextState] = useState(false);
  const [isImage, setImageState] = useState(true);
  const {
    translated, isTextHint, page, group,
  } = useSelector((state) => state.englishPuzzle);
  const { lvlStateSwitcher } = props;

  const soundBtnClickHandler = () => {
    setSoundState(!isSound)
  }

  const textBtnClickHandler = () => {
    setTextState(!isText)
    dispatch(changeTextHintState());
  }

  const playBtnClickHandler = () => {
  }

  const imageBtnClickHandler = () => {
    setImageState(!isImage)
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
        className={`englishPuzzle__textBtn ${isText ? 'englishPuzzle__textBtn--active' : ''}`}
        text=''
        clickHandler={textBtnClickHandler}
      />
      <Button
        className='englishPuzzle__playBtn'
        text=''
        clickHandler={playBtnClickHandler}
      />
      <Button
        className={`englishPuzzle__imageBtn ${isImage ? 'englishPuzzle__imageBtn--active' : ''}`}
        text=''
        clickHandler={imageBtnClickHandler}
      />
    </div>
  )
}

export default Controls;
