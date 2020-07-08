/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsAnswerReceived,
  setIsCorrectAnswer,
  getNextWord,
} from 'pages/cards/CardsSliceReducer';
import { baseAssetsUrl } from 'constants/constants';

import './CardInput.scss';

const CardInput = ({ cardInfo, isShowWordMeaning, isShowWordExample }) => {
  const {
    id, word, audio,
    audioMeaning, audioExample,
  } = cardInfo;
  const dispatch = useDispatch();
  const {
    isCorrectAnswer,
    isAnswerRecived,
  } = useSelector((state) => state.cards.currentCardAction);

  const wordLength = word.length;
  const wordArr = word.split('');

  const resultRef = useRef();

  const [inputValue, setInputValue] = useState('');

  const inputValueArr = inputValue.split('');

  const rightAnswer = () => {
    const audioArr = [`${baseAssetsUrl}${audio}`];

    if (isShowWordMeaning) {
      audioArr.push(`${baseAssetsUrl}${audioMeaning}`);
    }

    if (isShowWordExample) {
      audioArr.push(`${baseAssetsUrl}${audioExample}`);
    }

    const playAudioArr = (audioArray) => {
      const sound = new Audio();
      let index = 1;

      [sound.src] = audioArr;
      sound.play();

      sound.onended = () => {
        if (index < audioArray.length) {
          sound.src = audioArray[index];
          sound.play();
          index += 1;
        } else {
          dispatch(setIsAnswerReceived(false));
          dispatch(setIsCorrectAnswer(false));
          setInputValue('');
          dispatch(getNextWord(id));
        }
      };
    };

    playAudioArr(audioArr);
  };

  const handleCheckAnswer = (event) => {
    event.preventDefault();

    console.log(inputValue);

    if (inputValue.trim()) {
      dispatch(setIsAnswerReceived(true));
      if (inputValue.toLowerCase() === word.toLowerCase()) {
        dispatch(setIsCorrectAnswer(true));
        rightAnswer();
      } else {
        setInputValue('')
        dispatch(setIsCorrectAnswer(false));
      }
    }
  };

  console.log(wordArr);
  console.log(inputValueArr);

  return (
    <form className='card__input__container' onSubmit={handleCheckAnswer}>
      <input
        className='card__input'
        type='text'
        value={inputValue}
        size={wordLength}
        maxLength={wordLength}
        autoFocus
        disabled={isCorrectAnswer}
        onChange={(event) => setInputValue(event.target.value)}
        onClick={() => console.log('!!!!!!!!')}
      />
      <div className='card__result' ref={resultRef}>
        { isAnswerRecived
        && (
          wordArr.map((letter, index) => {
            let clazz = 'card__result__letter visible';
            if (letter !== inputValueArr[index]) {
              clazz += ' wrong';
            }

            return <span className={clazz} key={index.toString()}>{letter}</span>
          })
        )}
      </div>
    </form>
  );
};

CardInput.propTypes = {
  cardInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  isShowWordMeaning: PropTypes.bool.isRequired,
  isShowWordExample: PropTypes.bool.isRequired,
};

export default CardInput;
