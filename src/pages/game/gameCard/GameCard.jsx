import React from 'react';
import './GameCard.scss';
import sprint from '../../../assets/images/game/leo-spring.svg';

const link = '../../../assets/images/game/';

const GameCard = ({ name, image, description, path, width }) => {

  console.log();
  
  return (
    <div
      className='gamecard-wrapper'
      style={{ width:`${width}%`, backgroundImage: `${sprint}`}}
    >

    </div>
  );
};

export default GameCard;
