import React from 'react';
import PropTypes from 'prop-types';

import todayInfoItemsToArr from 'utils/todayInfoItemsToArr';
import TodayTarget from '../todayTarget/TodayTarget';
import TodayStatsItem from '../todayStatsItem/TodayStatsItem';

import './TodayStatus.scss';

const TodayStatus = ({ stats, totalCardsPerDay }) => {
  const {
    bestSeries,
    countRightAnswer,
    countWrongAnswer,
    countSkipedWords,
  } = stats.optional.cardStats;

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
  totalCardsPerDay: PropTypes.number.isRequired,
  stats: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default TodayStatus;
