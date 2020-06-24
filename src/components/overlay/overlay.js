import React from 'react';

import './overlayStyle.scss';

const Overlay = (props) => {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} className={`overlay ${className}`}> </div>
  );
}

export default Overlay;
