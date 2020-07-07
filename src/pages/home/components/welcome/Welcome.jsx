import React from 'react';
import { useHistory } from 'react-router-dom';

import ROUTER from 'routes';

import Button from 'components/button/Button';

import './Welcome.scss';

const Welcome = () => {
  const firstWelcomeMessage = 'Добро пожаловать!';
  const history = useHistory();
  return (
    <div className='home__welcome home-box'>
      <div>
        <h4 className='home__welcome__title home-box-title'>
          {firstWelcomeMessage}
        </h4>
        <p className='home__welcome__subtitle'>Готовы к теренировке?</p>
      </div>
      <Button
        type='button'
        className='button-start'
        disabled={false}
        onClick={() => history.push(ROUTER.cards)}
      >
        Учить слова
      </Button>
    </div>
  );
};

export default Welcome;
