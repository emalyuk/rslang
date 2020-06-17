import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  const history = useHistory();

  return (
    <div className='navbar'>
      <button type='button' onClick={() => history.push('/')}>
        Home
      </button>
      <button type='button' onClick={() => history.push('/login')}>
        Login
      </button>
      <button type='button' onClick={() => history.push('/registration')}>
        Registration
      </button>
      <button type='button' onClick={() => history.push('/game')}>
        Game
      </button>
      <button type='button' onClick={() => history.push('/team')}>
        Team
      </button>
      <button type='button' onClick={() => history.push('/promo')}>
        Promo
      </button>
    </div>
  );
};

export default Navbar;
