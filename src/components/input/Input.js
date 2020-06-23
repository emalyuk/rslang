import React from 'react';

import './Input.scss';

const Input = (props) => {
  const {
    value, type, className, placeholder, onChange,
  } = props;

  return(
    <input
      value={value}
      onChange={onChange}
      type={type}
      className={className}
      placeholder={placeholder}
    />
  );
}

export default Input;
