import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navOptions, navOptionsUnLoginUser, userLoginDataKey } from '../../constants/constants';

import NavItem from './NavItem';
import { logOut } from '../../pages/auth/login/LoginApi';

import './Navbar.scss';

export const Navbar = (props) => {
  const { isUserLoggedIn } = useSelector((state) => state.login);
  const history = useHistory();
  const { className, onSelect } = props;

  const navigation = () => {
    return (isUserLoggedIn) ? navOptions : navOptionsUnLoginUser;
  }

  // TODO: llogOut в логин API,
  // const logOut = () => {
  //   global.localStorage.removeItem(userLoginDataKey);
  //   global.location.reload();
  // }

  return (
    <nav className={`nav ${className}`}>
      <div className='nav__list'>
        {navigation().map((item) => (
          <NavItem
            key={item.title}
            onClick={() => { history.push(item.route); onSelect() }}
            title={item.title}
          />
        ))}

        {isUserLoggedIn && (
          <NavItem
            onClick={logOut}
            title='LogOut'
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
