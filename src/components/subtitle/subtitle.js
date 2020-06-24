import React from 'react';

import './subtitle.scss';

const Subtitle = (props) => {
  const { children } = props;

  return (
    <p className='authpage-title'>
      {children}
    </p>
  );
}

export default Subtitle;
