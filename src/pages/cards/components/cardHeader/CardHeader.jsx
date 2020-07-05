import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button/Button';
import './CardHeader.scss';

const CardHeader = ({ settings }) => {
  const { isShowDeleteButton, isShowHardButton } = settings;
  return (
    <div className='card__header'>
      {isShowDeleteButton && (
        <Button
          type='button'
          className='button card__header__button'
          disabled={false}
          onClick={() => console.log('DEL')}
        >
          Удалить слово
        </Button>
      )}
      {isShowHardButton && (
        <Button
          type='button'
          className='button card__header__button'
          disabled={false}
          onClick={() => console.log('HARD')}
        >
          Добавить в список сложных слов
        </Button>
      )}
    </div>
  );
};

CardHeader.propTypes = {
  isShowDeleteButton: PropTypes.bool.isRequired,
  isShowHardButton: PropTypes.bool.isRequired,
};

export default CardHeader;
