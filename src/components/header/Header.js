import React, { useState } from 'react';

import Logo from '../logo/Logo';
import Navbar from '../navbar/Navbar';
import Humburger from '../hamburgerNav/hamburgerNav';

import './HeaderStyle.scss';
import Overlay from '../overlay/overlay';

export const Header = () => {
  const [isToggleActive, setToggle] = useState(false);

  const switsher = () => setToggle(!isToggleActive);

  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />
        <Navbar onSelect={() => setToggle(false)} className={isToggleActive ? 'active' : ''} />
        <Humburger onClick={switsher} className={isToggleActive ? 'active' : ''} />
        <Overlay onClick={switsher} className={isToggleActive ? 'active' : ''} />
      </div>
    </header>
  );
}

export default Header;
