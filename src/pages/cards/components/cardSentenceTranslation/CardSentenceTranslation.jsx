import React from 'react';
import PropTypes from 'prop-types';

import './CardSentenceTranslation.scss';

const CardSentenceTranslation = ({ text, isCorrectAnswer }) => {
  let clazz = 'card__main__sentence-translation';
  if (isCorrectAnswer) {
    clazz += ' visible';
  }
  return <div className={clazz}>{text}</div>;
};

CardSentenceTranslation.propTypes = {
  text: PropTypes.string.isRequired,
  isCorrectAnswer: PropTypes.bool.isRequired,
};

export default CardSentenceTranslation;
