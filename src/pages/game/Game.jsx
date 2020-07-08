import React from 'react';
import { games } from './data';
import './Game.scss';
import GameCard from './gameCard/GameCard';

const Game = () => {
  return (
    <div className='game-wrapper'>
      {games.map((game, index) => <GameCard {...game} key={game.name} id={index} />)}
    </div>
  );
};

export default Game;
