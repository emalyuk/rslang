import React from 'react';
import PropTypes from 'prop-types';

import Welcome from '../welcome/Welcome';
import TodayStatus from '../todayStatus/TodayStatus';
import Progress from '../progress/Progress';

import './HomeStatus.scss';

const HomeStatus = ({ stats, totalCardsPerDay }) => (
  <div className='home__status'>
    <Welcome />
    {typeof stats.optional.cardStats !== 'undefined' && <TodayStatus stats={stats} totalCardsPerDay={totalCardsPerDay} />}

    <Progress wordsCountLearned={stats.learnedWords} />
  </div>
);

HomeStatus.propTypes = {
  stats: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  totalCardsPerDay: PropTypes.number,
};

HomeStatus.defaultProps = {
  totalCardsPerDay: 0,
};

export default HomeStatus;
