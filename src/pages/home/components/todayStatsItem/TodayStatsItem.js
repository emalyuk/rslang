import React from 'react';
import PropTypes from 'prop-types';

import './TodayStatsItem.scss';

const TodayStatsItem = ({ label, count }) => {
  return (
    <div className='home__status__stats--item'>
      <p className='home__status__stats--item__label'>{`${label}:`}</p>
      <div className='home__status__stats--item__count'>{count}</div>
    </div>
  );
};

TodayStatsItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
};

TodayStatsItem.defaultProps = {
  count: 0,
};

export default TodayStatsItem;
