import React from 'react';
import PropTypes from 'prop-types';

import './FormStyle.scss';

const Form = (props) => {
  const { onSubmit, children, className } = props;

  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}
