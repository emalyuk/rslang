import React from 'react';
import PropTypes from 'prop-types';

import './hamburgerNavStyle.scss';

export const Humburger = (props) => {
  const { className, onClick } = props;

  return (
    <button type='button' onClick={onClick} className={`hamburger ${className}`}>
      <div className='line'> </div>
      <div className='line'> </div>
      <div className='line'> </div>
    </button>
  );
}

export default Humburger;

Humburger.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}
