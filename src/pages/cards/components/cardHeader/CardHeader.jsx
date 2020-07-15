import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getNextWord } from 'pages/cards/CardsSliceReducer';

import Button from 'components/button/Button';
import { prepareWordToFetch } from 'utils/prepareWordToFetch';
import { putStats } from 'pages/home/HomeApi';
import './CardHeader.scss';

const CardHeader = ({ settings, wordId, stats }) => {
  const { isShowDeleteButton, isShowHardButton } = settings;
  const dispatch = useDispatch();

  const [countWords, setCountWords] = useState({
    countDeletedWords: 0,
    countHardWords: 0,
  });

  useEffect(() => {
    putStats({
      ...stats,
      optional: {
        ...stats.optional,
        cardStats: {
          ...stats.optional.cardStats,
          countDeletedWords: countWords.countDeletedWords,
          countHardWords: countWords.countHardWords,
        },
      },
    });
  }, [countWords, stats]);

  const pushToServer = (value) => {
    const userWord = prepareWordToFetch(value);

    dispatch(getNextWord(wordId, userWord));
  };

  const handleOnDeleteWord = () => {
    setCountWords({
      ...countWords,
      countDeletedWords: countWords.countDeletedWords + 1,
    });
    pushToServer('del');
  };

  const handleOnHardWord = () => {
    setCountWords({
      ...countWords,
      countHardWords: countWords.countHardWords + 1,
    });
    pushToServer('hard');
  };

  return (
    <div className='card__header'>
      {isShowDeleteButton && (
        <Button
          type='button'
          className='button card__header__button--del'
          disabled={false}
          onClick={handleOnDeleteWord}
        >
          &#10006;
        </Button>
      )}
      {isShowHardButton && (
        <Button
          type='button'
          className='button card__header__button'
          disabled={false}
          onClick={handleOnHardWord}
        >
          Добавить в список сложных слов
        </Button>
      )}
    </div>
  );
};

CardHeader.propTypes = {
  settings: PropTypes.objectOf(PropTypes.bool).isRequired,
  wordId: PropTypes.string.isRequired,
};

export default CardHeader;
