import React from 'react';
import PropTypes from 'prop-types';

import CardSentence from '../cardSentence/CardSentence';
import CardSentenceTranslation from '../cardSentenceTranslation/CardSentenceTranslation';

import './CardSentenceContainer.scss';

const CardMainSentenceContainer = ({
  text,
  textTranslation,
  isShowSentenceTranslation,
  // isCorrectAnswer,
}) => {
  return (
    <div className='card__main__sentence-container'>
      <CardSentence
        text={text}
        // isCorrectAnswer={isCorrectAnswer}
      />
      {isShowSentenceTranslation && (
        <CardSentenceTranslation text={textTranslation} />
      )}
    </div>
  );
};

CardMainSentenceContainer.propTypes = {
  text: PropTypes.string.isRequired,
  textTranslation: PropTypes.string.isRequired,
  isShowSentenceTranslation: PropTypes.bool.isRequired,
  // isCorrectAnswer: PropTypes.bool,
};

// CardMainSentenceContainer.defaultProps = {
//   isCorrectAnswer: false,
// };

export default CardMainSentenceContainer;
