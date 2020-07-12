import React from 'react';

const Button = ({ text, className, clickHandler }) => {
  return (
    <button
      type='button'
      className={className}
      onClick={clickHandler}
    >
      {text}
    </button>
  )
}

export default Button

Button.defaultProps = {
  text: '',
  className: '',
  clickHandler: () => { },
}
