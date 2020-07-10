import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  dontKnow, switchWord, changeActionType, check,
  resetWords,
} from '../EnglishPuzzleReducer'
import { Button } from '.';

const Actions = () => {
  const {
    actionsType, rows, index, isEnd, shuffled,
  } = useSelector((state) => state.englishPuzzle);
  const dispatch = useDispatch();
  const { isGuessed, isUseHint } = rows[index];

  const checkBtnClickHandler = () => {
    dispatch(check())
  }

  const continueBtnClickHandler = () => {
    dispatch(resetWords())
    dispatch(switchWord())
  }

  const resultBtnClickHandler = () => {
    console.log('result')
  }

  const nextBtnClickHandler = () => {
    console.log('nextClick')
  }

  const checkBtn = (
    <Button
      className='englishPuzzle__button'
      text='check'
      clickHandler={checkBtnClickHandler}
    />
  );

  const dontKnowBtn = (
    <Button
      className='englishPuzzle__button'
      text={'I don\'t know'}
      clickHandler={() => dispatch(dontKnow())}
    />
  );

  const continueBtn = (
    <Button
      className='englishPuzzle__button'
      text='Continue'
      clickHandler={continueBtnClickHandler}
    />
  );

  const nextRoundBtn = (
    <Button
      className='englishPuzzle__button englishPuzzle__button--next'
      text='Next Round'
      clickHandler={nextBtnClickHandler}
    />
  );

  const resultBtn = (
    <Button
      className='englishPuzzle__button'
      text='Results'
      clickHandler={resultBtnClickHandler}
    />
  );

  useEffect(() => {
    if (shuffled.length === 0 && !isUseHint) dispatch(changeActionType({ type: 'check' }))
    if (isUseHint || isGuessed) dispatch(changeActionType({ type: 'continue' }))
    if (shuffled.length > 0 && !isUseHint) dispatch(changeActionType({ type: 'dont' }))
    if (isEnd) dispatch(changeActionType({ type: 'result' }))
  }, [shuffled, isUseHint, isGuessed, isEnd, dispatch]);

  if (actionsType === 'continue') return continueBtn
  if (actionsType === 'check') return checkBtn
  if (actionsType === 'result') {
    return (
      <div className='englishPuzzle__actions'>
        {nextRoundBtn}
        {resultBtn}
      </div>
    )
  }

  return dontKnowBtn
}

export default Actions
