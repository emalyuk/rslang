/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsAnswerReceived,
  setIsCorrectAnswer,
} from 'pages/cards/CardsSliceReducer';

import './CardInput.scss';

const CardInput = ({ word }) => {
  const dispatch = useDispatch();
  const { currentCardAction } = useSelector((state) => state.cards);
  const { isAnswerReceived, isCorrectAnswer } = currentCardAction;

  const wordLength = word.length;
  const letterArr = word.split('');

  const [inputValue, setInputValue] = useState('');

  const handleCheckAnswer = (event) => {
    event.preventDefault();

    if (inputValue) {
      dispatch(setIsAnswerReceived(true));

      if (inputValue.toLowerCase() === word.toLowerCase()) {
        console.log('YES');
        dispatch(setIsCorrectAnswer(true));
      } else {
        console.log('NO');
        dispatch(setIsCorrectAnswer(false));
      }
    }
  };

  return (
    <form className='card__input__container' onSubmit={handleCheckAnswer}>
      <input
        className='card__input'
        type='text'
        size={wordLength}
        maxLength={wordLength}
        autoFocus
        disabled={isAnswerReceived}
        onChange={(event) => setInputValue(event.target.value)}
        onClick={() => console.log('!!!!!!!!')}
      />
      {/* <div
        className='card__input'
        contentEditable
        suppressContentEditableWarning
        autoFocus
      >
        <div className=''>
          {letterArr.map((letter, id) => {
            return (
              <span className='main__word__letter' key={`${letter}${id}`}>
                {letter}
              </span>
            );
          })}
        </div>
      </div> */}
    </form>
  );
};

CardInput.propTypes = {
  word: PropTypes.string.isRequired,
};

export default CardInput;
