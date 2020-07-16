import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useCountDown from 'react-countdown-hook';

import {
  convertMsToSeconds,
  initialTime,
  interval,
} from '../../constants/constants';

const Timer = (props) => {
  const { isTimerRun, onTimeLeft } = props;
  const [timeLeft, start] = useCountDown(initialTime, interval);

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

  return (`Время: ${convertMsToSeconds(timeLeft)}`);
};

export default Timer;

Timer.propTypes = {
  isTimerRun: PropTypes.bool.isRequired,
  onTimeLeft: PropTypes.func.isRequired,
}
