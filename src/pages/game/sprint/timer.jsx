import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useCountDown from 'react-countdown-hook';

import {
  convertMsToSeconds,
  initialTime,
  interval,
} from '../../../constants/constants';

// const convertMsToSeconds = (ms) => (ms / 1000).toFixed(1);
// const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
// const interval = 1000; // interval to change remaining time amount, defaults to 1000

const Timer = (props) => {
  const { isTimerRun, onTimeLeft } = props;
  const [timeLeft, start] = useCountDown(initialTime, interval);

  // start the timer during the first render
  useEffect(() => {
    if (isTimerRun) {
      start();
    }
  }, [isTimerRun]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeLeft()
    }
  }, [timeLeft])

  // const restart = useCallback(() => {
  //   const newTime = 42 * 1000;
  //   start(newTime);
  // }, [start]);

  return (
    <>
      <div className='timer'>{convertMsToSeconds(timeLeft)}</div>
    </>
  );
};

export default Timer;

Timer.propTypes = {
  isTimerRun: PropTypes.bool.isRequired,
  onTimeLeft: PropTypes.func.isRequired,
}
