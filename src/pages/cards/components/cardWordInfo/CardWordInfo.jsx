import React from 'react';
import PropTypes from 'prop-types';

import './CardWordInfo.scss';

const CardWordInfo = ({ text }) => {
  return <div className='card__main__word-info__text'>{text}</div>;
};

CardWordInfo.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CardWordInfo;
