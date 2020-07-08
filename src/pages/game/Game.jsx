import React from 'react';
import './Game.scss';
import { useHistory } from 'react-router-dom';
import { games } from './data';

const Game = () => {
  const history = useHistory();

  return (
    <div className='game'>
      <div className='game-wrapper'>
        {games.map((game) => (
          <div
            key={game}
            className='link-game'
            onClick={() => history.push(`/game/${game}`)}
          >
            {game}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
