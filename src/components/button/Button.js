import React from 'react';
import PropTypes from 'prop-types';

import './ButtonStyles.scss';

const Button = (props) => {
  const {
    children,
    onClick,
    className,
    disabled,
  } = props;

  return (
    <button type='button' disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
