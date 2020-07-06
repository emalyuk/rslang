import React from 'react';
import useCountDown from 'react-countdown-hook';
import PropTypes from 'prop-types'

const msToSec = (ms) => (ms / 1000).toFixed(0);
const initialTime = 60 * 1000;
const interval = 1000;

const Timer = (props) => {
  const [timeLeft, start] = useCountDown(initialTime, interval);
  React.useEffect(() => {
    start();
  }, []);

  const { className } = props;

  // const restart = React.useCallback(() => {
  //   const newTime = 60 * 1000;
  //   start(newTime);
  // }, [start]);

  return (
    <div className={className}>
      {msToSec(timeLeft)}
    </div>
  );
}

export default Timer;

Timer.propTypes = {
  className: PropTypes.string.isRequired,
}
