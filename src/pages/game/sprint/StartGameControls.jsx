import React from 'react';
import Button from '../../../components/button/Button';
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
