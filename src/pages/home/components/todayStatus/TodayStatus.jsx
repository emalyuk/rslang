import React from 'react';
import PropTypes from 'prop-types';

import todayInfoItemsToArr from 'utils/todayInfoItemsToArr';
import TodayTarget from '../todayTarget/TodayTarget';
import TodayStatsItem from '../todayStatsItem/TodayStatsItem';

import './TodayStatus.scss';

const TodayStatus = ({
  bestSeries,
  countRightAnswer,
  countWrongAnswer,
  totalCardsPerDay,
  countSkipedWords,
}) => {
  const todayInfoItems = todayInfoItemsToArr(
    bestSeries,
    countRightAnswer,
    countWrongAnswer,
    countSkipedWords,
  );

  return (
    <div className='home__status__today-status home-box'>
      <h4 className='home__status__title home-box-title'>Сегодня</h4>
      <div className='home__status__container'>
        <div className='home__status__stats'>
          {todayInfoItems.map(({ label, count }) => {
            return <TodayStatsItem label={label} count={count} key={label} />;
          })}
        </div>
        <TodayTarget
          totalCards={totalCardsPerDay}
          completedCards={countRightAnswer}
        />
      </div>
    </div>
  );
};

TodayStatus.propTypes = {
  totalCardsPerDay: PropTypes.number,
  bestSeries: PropTypes.number,
  countRightAnswer: PropTypes.number,
  countWrongAnswer: PropTypes.number,
  countSkipedWords: PropTypes.number,
};

TodayStatus.defaultProps = {
  bestSeries: 0,
  countRightAnswer: 0,
  countWrongAnswer: 0,
  totalCardsPerDay: 0,
  countSkipedWords: 0,
};

export default TodayStatus;
