import React from 'react';
import PropTypes from 'prop-types';

import TodayStatus from '../todayStatus';
import Progress from '../progress';

import './HomeStatus.scss';

const HomeStatus = ({ wordsCountLearned, totalCardsPerDay }) => {
  return (
    <div className='home__status'>
      <TodayStatus totalCardsPerDay={totalCardsPerDay} />
      <Progress wordsCountLearned={wordsCountLearned} />
    </div>
  );
};

HomeStatus.propTypes = {
  wordsCountLearned: PropTypes.number,
  totalCardsPerDay: PropTypes.number,
};

HomeStatus.defaultProps = {
  wordsCountLearned: 0,
  totalCardsPerDay: 0,
};

export default HomeStatus;
