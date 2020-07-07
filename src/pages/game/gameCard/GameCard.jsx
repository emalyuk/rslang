import React from 'react';
import './GameCard.scss';

const GameCard = ({ name, image, description, path, width, id }) => {
  return (
    <div
      className='gamecard-wrapper'
      style={{ width:`${width}%` }}
      data-id={id}
    >
      <div className='gamecard-bg-wrapper'>
        <div className='gamecard-bg-color' style={{ width: `${width}%` }} />
        <div className='gamecard-bg-image' style={{ width: `${width}%` }} />
      </div>
      <div className='gamecard-text'>
        <div className='gamecard-name'>
          {name}
        </div>
        <div className='gamecard-words'>
          234
        </div>
      </div>
      <div className='woah'>
        <div className='woah-icon' />
      </div>
      <div className='description'>
        {description}
      </div>
    </div>
  );
};

export default GameCard;
