import React from 'react';

import './InputStyle.scss';

const Input = (props) => {
  const {
    value, type, className, placeholder, onChange, required,
  } = props;

  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      className={className}
      placeholder={placeholder}
      required={required}
    />
  );
}

export default Input;
