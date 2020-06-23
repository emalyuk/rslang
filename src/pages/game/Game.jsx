import React, { useState } from 'react';
import './Game.scss';
import { useHistory } from 'react-router-dom';

const Game = () => {
  const [games] = useState(['savanna', 'speak-it', 'audio-challenge', 'english-puzzle', 'sprint', 'own-game']);
  const history = useHistory();

  return (
    <div className='game'>
      <div className='game-wrapper'>
        {games.map((game) => (
          <div
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
