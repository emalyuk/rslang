import React from 'react';
import PropTypes from 'prop-types';

import './TodayTarget.scss';

const TodayTarget = ({ todayWordLearned, totalCards }) => {
  const cardsLeft = totalCards - todayWordLearned;
  const totalCardsMessage = `Завершить ${totalCards} карточек.`;
  const resultCardsMessage = `Сегодня вы выполнили ${todayWordLearned} карточек. Для достижения цели завершите ${cardsLeft} карточек.`;

  return (
    <div className='home__status__target home-box-inner'>
      <p className='home__status__target--title'>Цель на сегодня:</p>
      <p className='home__status__target--total'>{totalCardsMessage}</p>
      <p className='home__status__target--result'>{resultCardsMessage}</p>
    </div>
  );
};

TodayTarget.propTypes = {
  totalCards: PropTypes.number.isRequired,
  todayWordLearned: PropTypes.number.isRequired,
};

export default TodayTarget;
