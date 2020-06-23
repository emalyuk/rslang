import React from 'react';
import { useHistory } from 'react-router-dom';

import NavItem from './NavItem';
import Logo from '../logo/Logo';

import './Navbar.scss';

export const Navbar = () => {
  const history = useHistory();

  // TODO: вынести это нах...
  const navOptions = [
    { route: '/', title: 'Home' },
    { route: '/login', title: 'Login' },
    { route: '/registration', title: 'Registration' },
    { route: '/game', title: 'Game' },
    { route: '/promo', title: 'Promo' },
    { route: '/team', title: 'Team' },
  ]

  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />

        <nav className='nav'>
          <div className='nav__list'>
            {navOptions.map((item) => (
              <NavItem
                key={item.title}
                onClick={() => history.push(item.route)}
                title={item.title}
              />
            ))}
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
