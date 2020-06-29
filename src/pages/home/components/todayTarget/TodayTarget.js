import React from 'react';
import PropTypes from 'prop-types';

import './TodayTarget.scss';

const TodayTarget = ({ comletedCards, totalCards }) => {
  const cardsLeft = totalCards - comletedCards;
  const totalCardsMessage = `Завершить ${totalCards} карточек.`;
  const resultCardsMessage = `Сегодня вы выполнили ${comletedCards} карточек. Для достижения цели завершите ${cardsLeft} карточек.`;

  return (
    <div className='home__status__target'>
      <p className='home__status__target--title'>Цель на сегодня:</p>
      <p className='home__status__target--total'>{totalCardsMessage}</p>
      <p className='home__status__target--result'>{resultCardsMessage}</p>
    </div>
  );
};

TodayTarget.propTypes = {
  totalCards: PropTypes.number.isRequired,
  comletedCards: PropTypes.number,
};

TodayTarget.defaultProps = {
  comletedCards: 0,
};

export default TodayTarget;
