import React from 'react';
import PropTypes from 'prop-types';

import './ButtonStyles.scss';

const Button = (props) => {
  const {
    children,
    onClick,
    className,
    disabled,
    type,
  } = props;

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
}
