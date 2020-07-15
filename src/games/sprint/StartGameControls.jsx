import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button/Button';
import LevelSelect from './LevelSelect'

const StartGameControls = (props) => {
  const {onStart, onLeavelSelect, leavels} = props;

  return (
    <div className='play-game-controller'>
      <Button
        disabled={false}
        onClick={onStart}
        className='button-to-start'
        type='button'
      >
        Начать
      </Button>

      <LevelSelect onSelect={onLeavelSelect} value={leavels} />
    </div>
  );
}

export default StartGameControls;

StartGameControls.propTypes = {
  onStart: PropTypes.func.isRequired,
  onLeavelSelect: PropTypes.func.isRequired,
  leavels: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}
