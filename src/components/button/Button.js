import React from 'react';

import './ButtonStyles.scss';

const Button = (props) => {
  const {
    children,
    onClick,
    className,
    disabled,
  } = props;

  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
