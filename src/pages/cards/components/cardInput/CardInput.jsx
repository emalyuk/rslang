/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsAnswerReceived,
  setIsCorrectAnswer,
  getNextWord,
} from 'pages/cards/CardsSliceReducer';
import { playAudioArr } from 'utils/playAudioArr';

import CardHintAnswer from '../cardHintAnswer/CardHintAnswer';

import './CardInput.scss';

const CardInput = ({ cardInfo, isShowWordMeaning, isShowWordExample }) => {
  const { word, audio, audioMeaning, audioExample } = cardInfo;
  const dispatch = useDispatch();
  const { isCorrectAnswer, isAnswerReceived, isSkippedWord } = useSelector(
    (state) => state.cards.currentCardAction,
  );

  const [inputValue, setInputValue] = useState('');

  const inputEl = useRef(null);

  const wordLength = word.length;
  const wordArr = word.toLowerCase().split('');
  const inputValueArr = inputValue.split('');

  useEffect(() => {
    setInputValue('');
    inputEl.current.focus();
  }, [word]);

  const updateCard = () => {
    setTimeout(() => {
      dispatch(getNextWord());
    }, 1000);
  };

  const handleCheckAnswer = (event) => {
    event.preventDefault();

    if (inputValue.trim()) {
      dispatch(setIsAnswerReceived(true));
      if (inputValue.toLowerCase() === word.toLowerCase()) {
        dispatch(setIsCorrectAnswer(true));
        playAudioArr(
          audio,
          audioMeaning,
          audioExample,
          isShowWordMeaning,
          isShowWordExample,
          updateCard,
        );
      } else {
        dispatch(setIsCorrectAnswer(false));
      }
    } else {
      // TODO: hint tooltip
      alert('Введите слово!');
    }
  };

  const handleOnChangeAnswer = () => {
    dispatch(setIsAnswerReceived(false));
    setInputValue('');
    inputEl.current.focus();
  };

  let inputClass = 'card__input';

  if (isAnswerReceived) {
    inputClass += ' hidden';
  }

  return (
    <form className='card__input__container' onSubmit={handleCheckAnswer}>
      <input
        className={inputClass}
        type='text'
        value={inputValue}
        size={wordLength}
        maxLength={wordLength}
        autoFocus
        disabled={isCorrectAnswer}
        onChange={(event) => setInputValue(event.target.value)}
        ref={inputEl}
      />
      <div className='card__result'>
        {(isAnswerReceived || isSkippedWord) && (
          <CardHintAnswer
            wordLength={wordLength}
            wordArr={wordArr}
            inputValueArr={inputValueArr}
            handleOnChangeAnswer={handleOnChangeAnswer}
          />
        )}
      </div>
    </form>
  );
};

CardInput.propTypes = {
  cardInfo: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  isShowWordMeaning: PropTypes.bool.isRequired,
  isShowWordExample: PropTypes.bool.isRequired,
};

export default CardInput;
