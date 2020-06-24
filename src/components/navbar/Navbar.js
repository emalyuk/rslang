import React from 'react';
import { useHistory } from 'react-router-dom';
import { navOptionsUnLoginUser } from '../../constants/constants';

import NavItem from './NavItem';

import './Navbar.scss';

export const Navbar = (props) => {
  const history = useHistory();
  const { className, onSelect } = props;

  return (
    <nav className={`nav ${className}`}>
      <div className='nav__list'>
        {navOptionsUnLoginUser.map((item) => (
          <NavItem
            key={item.title}
            onClick={() => { history.push(item.route); onSelect() }}
            title={item.title}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
