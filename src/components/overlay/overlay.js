import React from 'react';
import PropTypes from 'prop-types';

import './overlayStyle.scss';

const Overlay = (props) => {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} className={`overlay ${className}`} role='button' tabIndex='0'> </div>
  );
}

export default Overlay;

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
