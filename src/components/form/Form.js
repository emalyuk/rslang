import React from 'react';

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
