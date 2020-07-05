import React from 'react';
import PropTypes from 'prop-types';

import { wordsCountTotal } from 'constants/constants';
import { getIntegerPercent } from 'utils/getIntegerPercent';

import './Progress.scss';

const Progress = ({ wordsCountLearned }) => {
  const progressBarTitle = `Выучено слов: ${wordsCountLearned} из ${wordsCountTotal}`;
  const wordsPercentLearned = getIntegerPercent(
    wordsCountTotal,
    wordsCountLearned,
  );
  return (
    <div className='home__status__progress home-box'>
      <h4 className='home-box-title'>За всё время</h4>
      <div className='home__status__progress--box home-box-inner'>
        <div className='home__status__progress--label'>{progressBarTitle}</div>
        <div className='progress'>
          <div
            className='progress-bar'
            role='progressbar'
            aria-valuenow={wordsPercentLearned}
            aria-valuemin='0'
            aria-valuemax='100'
            style={{ width: `${wordsPercentLearned}%` }}
          />
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  wordsCountLearned: PropTypes.number,
};

Progress.defaultProps = {
  wordsCountLearned: 0,
};

export default Progress;
