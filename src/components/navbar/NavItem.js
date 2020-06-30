import React from 'react';

const NavItem = (props) => {
  const { onClick, title } = props;

  return (
    <button type='button' onClick={onClick} className='nav__item'>
      <span className='nav__link'>{title}</span>
    </button>
  );
};

export default NavItem;
