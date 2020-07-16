import React from 'react';
import './Popup.scss';

const Popup = ({ isActive, onClick, children }) => {

  return (
    <div
      className={`popup ${isActive ? 'popup--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Popup;
