import React from 'react';
import PropTypes from 'prop-types';

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

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.any.isRequired,
}
