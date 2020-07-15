import React from 'react';
import './Level.scss';

export const Level = ({ isGameMod, changeGameDifficulty, level }) => {

  return (
    <div className={['level', isGameMod ? 'hide' : ''].join(' ')} onClick={() => { changeGameDifficulty(level) }}></div>
  );
};

export default Level;
