import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from 'components/button/Button';
import { playAudioArr } from 'utils/playAudioArr';
import { putStats } from 'pages/home/HomeApi';
import { showNextCard, setIsSkipAnswer } from '../../CardsSliceReducer';

import './CardFooter.scss';

const CardFooter = ({ data, cardMainInfo, stats }) => {
  const dispatch = useDispatch();
  const { countSkipedWords } = stats.optional.cardStats;

  console.log(stats, 'stats');

  const [countSkip, setCountSkip] = useState(countSkipedWords);

  useEffect(() => {
    const newStats = {
      ...stats,
      optional: {
        ...stats.optional,
        cardStats: {
          ...stats.optional.cardStats,
          countSkipedWords: countSkip,
        },
      },
    };
    localStorage.setItem('stats', JSON.stringify(newStats));
    putStats(newStats);
  }, [countSkip]);

  const showNextWord = () => {
    setTimeout(() => {
      dispatch(setIsSkipAnswer(false));
      dispatch(showNextCard());
    }, 1000);
  };

  const handleOnClickShowAnswer = () => {
    const { audio, audioMeaning, audioExample } = data;
    const { isShowWordMeaning, isShowWordExample } = cardMainInfo;

    setCountSkip(countSkip + 1);

    dispatch(setIsSkipAnswer(true));

    playAudioArr(
      audio,
      audioMeaning,
      audioExample,
      isShowWordMeaning,
      isShowWordExample,
      showNextWord,
    );
  };

  console.log(countSkip, 'ASFASFASDASD');
  console.log(stats);

  return (
    <div className='card__footer'>
      <Button
        type='button'
        className='button card__footer__button'
        disabled={false}
        onClick={handleOnClickShowAnswer}
      >
        Показать ответ
      </Button>
    </div>
  );
};

CardFooter.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  cardMainInfo: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default CardFooter;
