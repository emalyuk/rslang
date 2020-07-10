import React, { useState, useEffect, useRef } from 'react';
import { games } from './data';
import GameCard from './gameCard/GameCard';
import './Game.scss';

const Game = () => {
  const [heightDescription, setHeightDescription] = useState();
  const gameCardRef = useRef(null);

  const changeHeight = () => setHeightDescription(gameCardRef.current.clientHeight);

  useEffect(() => {
    window.addEventListener('resize', changeHeight);

    return () => window.removeEventListener('resize', changeHeight);
  }, []);

  return (
    <div className='game-wrapper'>
      {games.map((game, index) => (
        <GameCard
          {...game}
          key={game.name}
          id={index}
          ref={!index ? gameCardRef : null}
          heightDescription={heightDescription}
        />
      ))}
    </div>
  );
};

export default Game;
