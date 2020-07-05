import React from 'react';
import PropTypes from 'prop-types';

import './CardSentenceTranslation.scss';

const CardSentenceTranslation = ({ text }) => {
  return <div className='card__main__sentence-translation'>{text}</div>;
};

CardSentenceTranslation.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CardSentenceTranslation;
