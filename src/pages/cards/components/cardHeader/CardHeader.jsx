import React from 'react';

import Button from 'components/button/Button';
import './CardHeader.scss';

const CardHeader = () => {
  return (
    <div className='card__header'>
      <Button
        type='button'
        className='button card__header__button'
        disabled={false}
        onClick={() => console.log('DEL')}
      >
        Удалить слово
      </Button>
      <Button
        type='button'
        className='button card__header__button'
        disabled={false}
        onClick={() => console.log('HARD')}
      >
        Добавить в список сложных слов
      </Button>
    </div>
  );
};

export default CardHeader;
