import React from 'react';
import { useHistory } from 'react-router-dom';

import './Logo.scss';
import './Navbar.scss';

export const Navbar = () => {
  const history = useHistory();

  return (
  // <div className="navbar">
  //   <span onClick={() => history.push("/")}>Home</span>
  //   <span onClick={() => history.push("/login")}>Login</span>
  //   <span onClick={() => history.push("/registration")}>Registration</span>
  //   <span onClick={() => history.push("/game")}>Game</span>
  // </div>

    <header className='header'>
      <div className='header__container'>
        <div className='logo'>
          <span className='logo__highlight'>RS</span>
          lang
        </div>

        <nav className='nav'>
          <ul className='nav__list'>
            <li onClick={() => history.push('/')} className='nav__item'>
              <span href='#' className='nav__link'>Home</span>
            </li>

            <li onClick={() => history.push('/login')} className='nav__item'>
              <span href='#' className='nav__link'>Login</span>
            </li>

            <li onClick={() => history.push('/registration')} className='nav__item'>
              <span href='#' className='nav__link'>Registration</span>
            </li>

            <li onClick={() => history.push('/game')} className='nav__item'>
              <span href='#' className='nav__link'>Game</span>
            </li>

            <li onClick={() => history.push('/promo')} className='nav__item'>
              <span href='#' className='nav__link'>Promo</span>
            </li>

            <li onClick={() => history.push('/team')} className='nav__item'>
              <span href='#' className='nav__link'>Team</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
