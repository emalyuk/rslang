import React from 'react';
import PropTypes from 'prop-types';

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

Subtitle.propTypes = {
  children: PropTypes.array.isRequired,
}
