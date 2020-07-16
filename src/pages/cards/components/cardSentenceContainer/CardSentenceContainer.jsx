import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import CardSentence from '../cardSentence/CardSentence';
import CardSentenceTranslation from '../cardSentenceTranslation/CardSentenceTranslation';

import './CardSentenceContainer.scss';

const CardMainSentenceContainer = ({
  text,
  textTranslation,
  isShowSentenceTranslation,
}) => {
  const { currentCardAction } = useSelector((state) => state.cards);
  const { isCorrectAnswer } = currentCardAction;
  return (
    <div className='card__main__sentence-container'>
      <CardSentence text={text} />
      {isShowSentenceTranslation && (
        <CardSentenceTranslation
          text={textTranslation}
          isCorrectAnswer={isCorrectAnswer}
        />
      )}
    </div>
  );
};

CardMainSentenceContainer.propTypes = {
  text: PropTypes.string.isRequired,
  textTranslation: PropTypes.string.isRequired,
  isShowSentenceTranslation: PropTypes.bool.isRequired,
};

export default CardMainSentenceContainer;
