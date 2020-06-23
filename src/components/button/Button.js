import React from 'react';

import './Button.scss';

const Button = (props) => {
  const {
    value,
    onClick,
    className,
  } = props;

  return (
    <button onClick={onClick} className={className}>
      {value}
    </button>
  );
}

export default Button;
