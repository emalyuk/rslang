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
import { prepareWordToFetch } from 'utils/prepareWordToFetch';
import { putStats, getStats } from 'pages/home/HomeApi';
import CardHintAnswer from '../cardHintAnswer/CardHintAnswer';

import './CardInput.scss';

const CardInput = ({ cardInfo, isShowWordMeaning, isShowWordExample, userStats }) => {
  const { id, word, audio, audioMeaning, audioExample } = cardInfo;
  const dispatch = useDispatch();
  const { isCorrectAnswer, isAnswerReceived, isSkippedWord } = useSelector(
    (state) => state.cards.currentCardAction,
  );

  const [inputValue, setInputValue] = useState('');
  const [stats, setStats] = useState(userStats);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [bestSeries, setBestSeries] = useState(0);

  console.log(stats);

  const inputEl = useRef(null);

  const wordLength = word.length;
  const wordArr = word.toLowerCase().split('');
  const inputValueArr = inputValue.split('');

  useEffect(() => {
    putStats(stats);
  }, [stats]);

  useEffect(() => {
    setInputValue('');
    inputEl.current.focus();
  }, [word]);

  const updateCard = () => {
    const diff = incorrectAnswerCount > 0 ? 'strong' : 'weak';
    const isRepeat = incorrectAnswerCount > 0;
    const userWord = prepareWordToFetch(diff, isRepeat);
    setIncorrectAnswerCount(0);
    setTimeout(() => {
      dispatch(getNextWord(id, userWord));
    }, 1000);
  };

  const handleCheckAnswer = (event) => {
    event.preventDefault();

    if (inputValue.trim()) {
      dispatch(setIsAnswerReceived(true));
      if (inputValue.toLowerCase() === word.toLowerCase()) {
        dispatch(setIsCorrectAnswer(true));
        setBestSeries(bestSeries + 1);
        setStats(() => {
          return {
            learnedWords: stats.learnedWords + 1,
            optional: {
              ...stats.optional,
              cardStats: {
                ...stats.optional.cardStats,
                date: (new Date(Date.now())).toLocaleDateString(),
                todayWordLearned: stats.optional.cardStats.todayWordLearned + 1,
                countRightAnswers: stats.optional.cardStats.countRightAnswers + 1,
              },
            },
          };
        });
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
        setIncorrectAnswerCount(() => {
          return incorrectAnswerCount + 1;
        });
        setStats(() => {
          return {
            ...stats,
            optional: {
              ...stats.optional,
              cardStats: {
                ...stats.optional.cardStats,
                bestSeries: stats.optional.cardStats.bestSeries < bestSeries ? bestSeries : stats.optional.cardStats.bestSeries,
                countWrongAnswers: stats.optional.cardStats.countWrongAnswers + 1,
              },
            },
          };
        });

        setBestSeries(0);
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
