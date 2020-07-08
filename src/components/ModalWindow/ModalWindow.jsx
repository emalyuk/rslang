import React from 'react';
import './ModalWindow.scss';

const ModalWindow = ({ children }) => {
  return (
    <div className='modal-wrapper'>
      <div className='bg-modal' />
      <div className='modal-window'>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
