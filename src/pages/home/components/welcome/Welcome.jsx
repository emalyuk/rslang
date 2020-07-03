import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/button/Button';

import './Welcome.scss';

const Welcome = ({ handleClick }) => {
  const firstWelcomeMessage = 'Добро пожаловать!';
  return (
    <div className='home__welcome home-box'>
      <div>
        <h4 className='home__welcome__title home-box-title'>{firstWelcomeMessage}</h4>
        <p className='home__welcome__subtitle'>Готовы к теренировке?</p>
      </div>
      <Button
        type='button'
        className='button-start'
        disabled={false}
        onClick={handleClick}
      >
        Учить слова
      </Button>
    </div>
  );
};

Welcome.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default Welcome;
