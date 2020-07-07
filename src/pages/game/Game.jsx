import React from 'react';
import { games } from './data';
import './Game.scss';
import GameCard from './gameCard/GameCard';

const Game = () => {
  return (
    <div className='game-wrapper'>
      {games.map((game) => <GameCard {...game} key={game.name} />)}
    </div>
  );
};

export default Game;
