import React from 'react';

import Button from 'components/button/Button';
import './CardFooter.scss';

const CardFooter = () => {
  return (
    <div className='card__footer'>
      <Button
        type='button'
        className='button card__footer__button'
        disabled={false}
        onClick={() => console.log('SHOW ANSWER')}
      >
        Показать ответ
      </Button>
    </div>
  );
};

export default CardFooter;
